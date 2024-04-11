import { Budget } from "../types/budget";
import { Info, LoginInfo, User } from "../types/user";
import { HashContent } from "./hashlib";

export class DataStorage {
  static addLoginData(data: Info): void {
    localStorage.setItem(data.id, JSON.stringify(data));
  }

  static setCurrentUser(data: Info): void {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }

  static async getData(key: string): Promise<string | null> {
    const hashedKey = await HashContent(key);
    return localStorage.getItem(hashedKey);
  }

  static async getLoginData(info: LoginInfo): Promise<LoginInfo | null> {
    const { email, password }: LoginInfo = info;
    const stringData = await DataStorage.getData(email);
    if (stringData !== null) return { email, password };
    return null;
  }

  static async getUserData(info: LoginInfo): Promise<Info | null> {
    const { email }: LoginInfo = info;
    const stringData = await DataStorage.getData(email);
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

  static async addBudgetData(
    data: Budget,
    addBudgets: (budget: Budget) => void
  ) {
    const currentUser = DataStorage.getCurrentUser();

    if (!currentUser) {
      throw new Error("Unable to add data");
    }

    const _id = await HashContent(currentUser.email);
    const rawData = localStorage.getItem(_id);
    let user: User | null = null;
    if (rawData) user = JSON.parse(rawData);
    //for localstorage only
    if (DataStorage.budgetDataExists(data)) return;
    currentUser.userData.push(data);

    addBudgets(data);
    user?.userData.push(data);
    if (user) localStorage.setItem(user.id, JSON.stringify(user));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  static budgetDataExists(data: Budget): boolean {
    const currentUser = DataStorage.getCurrentUser();
    return (currentUser as Info).userData.some(
      (budgetData) => budgetData.id === data.id
    );
  }

  static updateBudgetDataOnLoad(addBudget: (budget: Budget) => void) {
    const budgetData = DataStorage.getCurrentUser()?.userData;
    if (!budgetData) return;
    budgetData.forEach((budget) => {
      addBudget(budget);
    });
  }

  static addUserBudgetData(data: Budget) {
    const currentUser = DataStorage.getCurrentUser();
    if (currentUser === null) return;
    currentUser.userData.push(data);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  static getUserBudgetData(): Budget[] | null {
    const currentUser = DataStorage.getCurrentUser();
    if (currentUser) return currentUser.userData ? currentUser.userData : null;
    return null;
  }

  static getBudgetDataByID(id: string | undefined): Budget | undefined {
    if (!id) return undefined;
    const budgetData = DataStorage.getUserBudgetData();
    return budgetData?.find((elem) => elem.id === id);
  }

  static updateBudgetData(budgetID: string, updateBudget: Budget) {
    const currentUser = DataStorage.getCurrentUser();
    const budgetData = DataStorage.getBudgetDataByID(budgetID);
    if (!budgetData || !currentUser) return;

    const isDuplicate = DataStorage.getBudgetDataByID(updateBudget.id);
    const budgetIndex = currentUser.userData.findIndex(
      (budget) => budget.id === (isDuplicate ? updateBudget.id : budgetID)
    );
    if (budgetIndex === -1) return;

    currentUser.userData[budgetIndex] = updateBudget;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  static deleteBudgetData(budgetID: string) {
    const currentUser = DataStorage.getCurrentUser();
    const budgetData = DataStorage.getBudgetDataByID(budgetID);
    if (!currentUser || !budgetData) return;
    const budgetIndex = currentUser.userData.findIndex(
      (budget) => budget.id === budgetID
    );
    currentUser.userData.splice(budgetIndex, 1);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
}
