import axios from "axios";
import * as React from "react";
import ApiManagement from "../../management/api-mamagement";
import {
  AppliedFilters,
  FilterProps,
  PlanetApi,
} from "../../management/interface";
import {
  GET_DATA,
  SET_DATA,
  UPDATE_DATA,
} from "../../management/local-storage";
import FilterBox from "../filter-box/filter-box";
import Result from "../result/result";
import Search from "../search/search";
import "./home.scss";

let appliedFilters = {
  color: [],
  shape: [],
  size: [],
};
let promiseResolved = false;
export default function Home(): React.ReactElement {
  const storeName = "planet";
  const [searchTexts, setSearchTexts] = React.useState<string>(null);
  const [filters, setFilters] = React.useState<FilterProps[]>(null);
  const [planetApi, setPlanetApi] = React.useState<PlanetApi[]>(null);
  // const [appliedFilters, setAppliedFilters] = React.useState<AppliedFilters>({
  //   color: [],
  //   shape: [],
  //   size: [],
  // });
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchTexts(event.currentTarget.value);
  };
  const changeFiltersState = (key: string, id: string, checked: boolean) => {
    // let tempFilter = appliedFilters;
    if (checked) {
      appliedFilters[key].push(id);
    } else {
      appliedFilters[key] = appliedFilters[key].filter((item: string) => {
        return item !== id;
      });
    }
    UPDATE_DATA(storeName, key, appliedFilters[key]);
    // setAppliedFilters(tempFilter);
    console.log(appliedFilters);
    searchApiCall();
  };

  React.useEffect(() => {
    ApiManagement.initializeApi().then(
      ([shapeResult, colorResult, sizeResult]) => {
        let filters: AppliedFilters = GET_DATA(storeName);
        setFilters([
          {
            headerName: "Shapes",
            fields: shapeResult.data,
            queryParamsId: "shape",
          },
          {
            headerName: "Colors",
            fields: colorResult.data,
            queryParamsId: "color",
          },
          {
            headerName: "Sizes",
            fields: sizeResult.data,
            queryParamsId: "size",
          },
        ]);
        if (filters && !filters.color && !filters.shape && !filters.size) {
          SET_DATA(storeName, {
            color: [],
            shape: [],
            size: [],
            q: "",
          });
        } else {
          setSearchTexts(filters.q);
          // setAppliedFilters({
          //   color: filters.color,
          //   shape: filters.shape,
          //   size: filters.size,
          // });
          appliedFilters = {
            color: filters.color,
            shape: filters.shape,
            size: filters.size,
          };
          searchApiCall();
        }
        promiseResolved = true;
      },
    );
  }, []);

  const searchApiCall = () => {
    if (!promiseResolved) return;
    let params = new URLSearchParams();
    searchTexts && params.set("q", searchTexts);
    for (let key in appliedFilters) {
      if (appliedFilters[key].length > 0) {
        params.set(key, appliedFilters[key].toString());
      }
    }
    axios
      .get<PlanetApi[]>(`http://localhost:3000/planets?${params.toString()}`)
      .then((result) => {
        // console.log(result.data);
        setPlanetApi(result.data);
      });
  };

  React.useEffect(() => {
    searchTexts !== null &&
      promiseResolved &&
      UPDATE_DATA(storeName, "q", searchTexts);
    searchApiCall();
  }, [searchTexts]);
  return (
    <div className="container">
      <Search
        searchTexts={searchTexts}
        onEnter={searchApiCall}
        onSearchTextChange={handleSearchTextChange}
      ></Search>
      <FilterBox
        filters={filters}
        appliedFilter={appliedFilters}
        changeFiltersState={changeFiltersState}
      ></FilterBox>
      <Result results={planetApi}></Result>
    </div>
  );
}
