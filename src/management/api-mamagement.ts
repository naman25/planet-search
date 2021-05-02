import Axios from "axios";
import { FieldNamesProps } from "./interface";

class ApiManagement {
  private static domain = "http://localhost:3000/";
  private static shapesApi = "shapes";
  private static ColorsApi = "colors";
  private static SizesApi = "sizes";
  public static getShapes = () => {
    return Axios.get<FieldNamesProps[]>(
      ApiManagement.domain + ApiManagement.shapesApi,
    );
  };
  public static getColors = () => {
    return Axios.get<FieldNamesProps[]>(
      ApiManagement.domain + ApiManagement.ColorsApi,
    );
  };
  public static getSizes = () => {
    return Axios.get<FieldNamesProps[]>(
      ApiManagement.domain + ApiManagement.SizesApi,
    );
  };
  public static initializeApi = () => {
    return Promise.all([
      ApiManagement.getShapes(),
      ApiManagement.getColors(),
      ApiManagement.getSizes(),
    ]);
  };
}

export default ApiManagement;
