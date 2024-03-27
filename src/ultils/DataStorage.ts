import { Info, LoginInfo } from "../types/user";
import { HashContent } from "./hashlib";

export class DataStorage {
  static addLoginData(data: Info): void {
    localStorage.setItem(data.id, JSON.stringify(data));
  }

  static async getLoginData(info: LoginInfo): Promise<LoginInfo | null> {
    const { email, password }: LoginInfo = info;
    const hashedId = await HashContent(email);
    const stringData: string | null = localStorage.getItem(hashedId);
    if (stringData !== null) return { email, password };
    return null;
  }
}
