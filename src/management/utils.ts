import { FieldNamesProps } from "./interface";

const setFilterUtil = (
  headerName: string,
  fields: FieldNamesProps[],
  queryParamsId: string,
) => {
  return {
    headerName,
    fields,
    queryParamsId,
  };
};

export default setFilterUtil;
