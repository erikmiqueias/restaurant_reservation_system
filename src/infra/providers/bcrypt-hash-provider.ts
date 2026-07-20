import bcrypt from "bcryptjs";
import { HashProvider } from "../../app/ports/out/providers/hash-provider.js";

export class BcryptHashProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
