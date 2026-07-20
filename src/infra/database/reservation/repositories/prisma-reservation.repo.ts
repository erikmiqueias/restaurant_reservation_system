import { ReservationRepository } from "../../../../app/reservation/ports/out/repositories/reservation.interface.js";
import { Reservation } from "../../../../domain/reservation/entities/reservation.js";
import client from "../../prisma/db.js";

export class PrismaReservationRepository implements ReservationRepository {
  async create(reservation: Reservation): Promise<Reservation> {
    const createdReservation = await client.reservation.create({
      data: {
        id: reservation.id,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        status: reservation.status,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
        tableId: reservation.tableId,
        userId: reservation.userId,
        guestCount: reservation.guestCount,
      },
    });

    return Reservation.restore(
      {
        startTime: createdReservation.startTime,
        endTime: createdReservation.endTime,
        status: createdReservation.status,
        createdAt: createdReservation.createdAt,
        updatedAt: createdReservation.updatedAt,
        tableId: createdReservation.tableId,
        userId: createdReservation.userId,
        guestCount: createdReservation.guestCount,
      },
      createdReservation.id,
    );
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
