import { Info, LoginInfo } from "../types/user";
import { HashContent } from "./hashlib";

export class DataStorage {
  static addLoginData(data: Info): void {
    localStorage.setItem(data.id, JSON.stringify(data));
  }

  static setCurrentUser(data: Info): void {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }

  static async getLoginData(info: LoginInfo): Promise<LoginInfo | null> {
    const { email, password }: LoginInfo = info;
    const hashedId = await HashContent(email);
    const stringData: string | null = localStorage.getItem(hashedId);
    if (stringData !== null) return { email, password };
    return null;
  }

  static async getUserData(info: LoginInfo): Promise<Info | null> {
    const { email }: LoginInfo = info;
    const hashedId = await HashContent(email);
    const stringData: string | null = localStorage.getItem(hashedId);
    if (stringData != null) return JSON.parse(stringData);
    return null;
  }

  static getCurrentUser(): Info | null {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : currentUser;
  }

  static clearCurrentUser(): void {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) localStorage.removeItem("currentUser");
  }
}
