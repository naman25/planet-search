import Axios, { AxiosResponse } from "axios";
import { FieldNamesProps, PlanetApi, ResponseFilterArray } from "./interface";

class ApiManagement {
  private static domain = "http://localhost:3000/";
  private static shapesApi = "shapes";
  private static colorsApi = "colors";
  private static sizesApi = "sizes";
  private static getData = <T>(path: string): Promise<AxiosResponse<T>> => {
    return Axios.get(ApiManagement.domain + path);
  };
  public static initializeApi = async (): Promise<ResponseFilterArray> => {
    const [shapeResult, colorResult, sizeResult] = await Promise.all([
      ApiManagement.getData<FieldNamesProps[]>(ApiManagement.shapesApi),
      ApiManagement.getData<FieldNamesProps[]>(ApiManagement.colorsApi),
      ApiManagement.getData<FieldNamesProps[]>(ApiManagement.sizesApi),
    ]);
    const filters = {
      colors: colorResult.data,
      shapes: shapeResult.data,
      sizes: sizeResult.data,
    };
    return await new Promise((resolve, reject) => {
      resolve(filters);
    });
  };
  public static planetApi = (params: string) => {
    return ApiManagement.getData<PlanetApi[]>("planets?" + params);
  };
}

export default ApiManagement;
