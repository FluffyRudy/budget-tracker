import { LoginInfo } from "../../types/user";
import { DataStorage } from "../../ultils/DataStorage";

export class Authetication {
  static async isUserLoggedIn(info: LoginInfo): Promise<boolean> {
    const storageResponse = await DataStorage.getLoginData(info);
    return storageResponse === null ? false : true;
  }
}
