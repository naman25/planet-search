import * as React from "react";
import { FilterProps } from "../../consts/interface";

export interface SearchProps {
  filters?: FilterProps[];
  changeFiltersState: (key: string, id: string, checked: boolean) => void;
}
const FilterBox: React.FC<SearchProps> = (props: SearchProps) => {
  if (props.filters === null) {
    return null;
  }
  return (
    <div className="conatiner">
      {props.filters.map((filter) => {
        return (
          <>
            <div className="header">{filter.headerName}</div>
            {filter.fields.map((field) => {
              return (
                <>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      props.changeFiltersState(
                        filter.queryParamsId,
                        field.id,
                        event.target.checked,
                      );
                    }}
                  />
                  <span className="field">{field.name}</span>
                </>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default FilterBox;
