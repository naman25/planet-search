import { AppliedFilters, FieldNamesProps } from "./interface";
import { GET_DATA, SET_DATA } from "./local-storage";

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

export const isAppliedFiltersInValid = (filters: AppliedFilters) => {
  return filters && filters.color && filters.shape && filters.size;
};
const GetValidAppliedFilters = (storeName: string): AppliedFilters => {
  let filters: AppliedFilters = GET_DATA(storeName);
  if (isAppliedFiltersInValid(filters)) {
    return filters;
  }
  filters = {
    color: [],
    shape: [],
    size: [],
    q: "",
  };
  SET_DATA(storeName, filters);
  return filters;
};
export { setFilterUtil, GetValidAppliedFilters };
