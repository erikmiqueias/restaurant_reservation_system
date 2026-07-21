import { Prisma } from "@prisma/client";
import { ReservationRepository } from "../../../../app/reservation/ports/out/repositories/reservation.interface.js";
import { Reservation } from "../../../../domain/reservation/entities/reservation.js";
import client from "../../prisma/db.js";
import { ReservationTableConflictError } from "../../../../app/reservation/errors/reservation.error.js";

export class PrismaReservationRepository implements ReservationRepository {
  async create(reservation: Reservation): Promise<Reservation> {
    try {
      const createdResevation = await client.$transaction(
        async (tx) => {
          const conflict = await tx.reservation.findFirst({
            where: {
              tableId: reservation.tableId,
              status: "ACTIVE",
              AND: [
                {
                  startTime: {
                    lt: reservation.endTime,
                  },
                  endTime: {
                    gt: reservation.startTime,
                  },
                },
              ],
            },
          });

          if (conflict) throw new ReservationTableConflictError();
          return await tx.reservation.create({
            data: {
              id: reservation.id,
              startTime: reservation.startTime,
              endTime: reservation.endTime,
              status: reservation.status,
              guestCount: reservation.guestCount,
              tableId: reservation.tableId,
              userId: reservation.userId,
              createdAt: reservation.createdAt,
              updatedAt: reservation.updatedAt,
            },
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
      return Reservation.restore(
        {
          tableId: createdResevation.tableId,
          userId: createdResevation.userId,
          startTime: createdResevation.startTime,
          endTime: createdResevation.endTime,
          status: createdResevation.status,
          guestCount: createdResevation.guestCount,
          createdAt: createdResevation.createdAt,
          updatedAt: createdResevation.updatedAt ?? undefined,
        },
        createdResevation.id,
      );
    } catch (error) {
      console.log(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        throw new ReservationTableConflictError();
      }
      throw error;
    }
  }
  async findConflictingReservations(
    tableId: string,
    newStartTime: Date,
    newEndTime: Date,
  ): Promise<Reservation | null> {
    const conflict = await client.reservation.findFirst({
      where: {
        tableId,
        status: "ACTIVE",
        AND: [
          {
            startTime: {
              lt: newEndTime,
            },
            endTime: {
              gt: newStartTime,
            },
          },
        ],
      },
    });

    if (!conflict) return null;
    return Reservation.restore(
      {
        tableId: conflict.tableId,
        userId: conflict.userId,
        startTime: conflict.startTime,
        endTime: conflict.endTime,
        status: conflict.status,
        guestCount: conflict.guestCount,
        createdAt: conflict.createdAt,
        updatedAt: conflict.updatedAt ?? undefined,
      },
      conflict.id,
    );
  }
  async getAllReservationsByUserId(
    userId: string,
  ): Promise<{ reservation: Reservation; tableNumber: number }[]> {
    const reservations = await client.reservation.findMany({
      where: {
        userId,
      },
      include: {
        table: {
          select: {
            tableNumber: true,
          },
        },
      },
    });

    return reservations.map((row) => {
      const reservation = Reservation.restore(
        {
          startTime: row.startTime,
          endTime: row.endTime,
          status: row.status as "ACTIVE" | "CANCELED",
          guestCount: row.guestCount,
          tableId: row.tableId,
          userId: row.userId,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt ?? undefined,
        },
        row.id,
      );
      return {
        reservation,
        tableNumber: row.table.tableNumber,
      };
    });
  }
  async update(reservation: Reservation): Promise<void> {
    await client.reservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: reservation.status,
        guestCount: reservation.guestCount,
        tableId: reservation.tableId,
        userId: reservation.userId,
        updatedAt: reservation.updatedAt,
      },
    });
  }
  async findReservationById(id: string): Promise<Reservation | null> {
    const reservationDb = await client.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservationDb) return null;

    return Reservation.restore(
      {
        tableId: reservationDb.tableId,
        userId: reservationDb.userId,
        startTime: reservationDb.startTime,
        endTime: reservationDb.endTime,
        status: reservationDb.status,
        guestCount: reservationDb.guestCount,
        createdAt: reservationDb.createdAt,
        updatedAt: reservationDb.updatedAt ?? undefined,
      },
      reservationDb.id,
    );
  }
  async hasFutureActiveReservations(tableId: string): Promise<boolean> {
    const reservations = await client.reservation.count({
      where: {
        tableId,
        status: "ACTIVE",
        endTime: {
          gt: new Date(),
        },
      },
    });
    return reservations > 0;
  }
}
