/**
 * list of all the routes on front end page
 */
export default class Routes {
  public static Page1 = "/Page1";
  public static Page2 = "/Page2";
  public static Home = "/Home";
}

export interface IAvailablePage {
  name: string;
  page: Pages;
  path: string;
}

export enum Pages {
  Home,
  Page1,
  Page2,
}

export const availablePages: IAvailablePage[] = [
  {
    name: "Home",
    page: Pages.Home,
    path: Routes.Home,
  },
  {
    name: "Page1",
    page: Pages.Page1,
    path: Routes.Page1,
  },
  {
    name: "Page2",
    page: Pages.Page2,
    path: Routes.Page2,
  },
];
