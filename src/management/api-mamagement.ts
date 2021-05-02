import Axios from "axios";

class ApiManagement {
  private static domain = "http://localhost:3000/";
  private static shapesApi = "shapes";
  private static colorsApi = "colors";
  private static sizesApi = "sizes";
  private static getData = (path: string) => {
    return Axios.get(ApiManagement.domain + path);
  };
  public static initializeApi = () => {
    return Promise.all([
      ApiManagement.getData(ApiManagement.shapesApi),
      ApiManagement.getData(ApiManagement.colorsApi),
      ApiManagement.getData(ApiManagement.sizesApi),
    ]);
  };
  public static planetApi = (params: string) => {
    return ApiManagement.getData("planets?" + params);
  };
}

export default ApiManagement;
