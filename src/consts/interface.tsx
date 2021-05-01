export interface FilterProps {
  headerName: string;
  fields: FieldNamesProps[];
  queryParamsId?: string;
}

export interface FieldNamesProps {
  name: string;
  id: string;
}

export interface AppliedFilters {
  shape: string[];
  size: string[];
  color: string[];
}

export interface PlanetApi {
  id: string;
  name: string;
  shape: string;
  color: string;
  size: string;
}
