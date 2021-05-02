import * as React from "react";
import ApiManagement from "../../management/api-mamagement";
import {
  FilterProps,
  PlanetApi,
  ResponseFilterArray,
} from "../../management/interface";
import { UPDATE_DATA } from "../../management/local-storage";
import { GetValidAppliedFilters, setFilterUtil } from "../../management/utils";
import FilterBox from "../filter-box/filter-box";
import Result from "../result/result";
import Search from "../search/search";
import "./home.scss";

const storeName = "planet";
let appliedFilters = GetValidAppliedFilters(storeName);
let promiseResolved = false;

export default function Home(): React.ReactElement {
  const [searchTexts, setSearchTexts] = React.useState<string>(
    appliedFilters.q,
  );
  const [filters, setFilters] = React.useState<FilterProps[]>(null);
  const [planetApi, setPlanetApi] = React.useState<PlanetApi[]>(null);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchTexts(event.currentTarget.value);
  };

  const changeFiltersState = (key: string, id: string, checked: boolean) => {
    if (checked) {
      appliedFilters[key].push(id);
    } else {
      appliedFilters[key] = appliedFilters[key].filter((item: string) => {
        return item !== id;
      });
    }
    UPDATE_DATA(storeName, key, appliedFilters[key]);
    console.log(appliedFilters);
    searchApiCall();
  };

  React.useEffect(() => {
    ApiManagement.initializeApi().then((filters: ResponseFilterArray) => {
      setFilters([
        setFilterUtil("Shapes", filters.shapes, "shape"),
        setFilterUtil("Colors", filters.colors, "color"),
        setFilterUtil("Sizes", filters.sizes, "size"),
      ]);
      promiseResolved = true;
      searchApiCall();
    });
  }, []);

  const searchApiCall = () => {
    if (!promiseResolved) return;
    let params = new URLSearchParams();
    for (let key in appliedFilters) {
      if (appliedFilters[key].length > 0) {
        params.set(key, appliedFilters[key].toString());
      }
    }
    ApiManagement.planetApi(params.toString()).then((result) => {
      setPlanetApi(result.data);
    });
  };

  React.useEffect(() => {
    if (searchTexts !== null && promiseResolved) {
      appliedFilters["q"] = searchTexts;
      UPDATE_DATA(storeName, "q", searchTexts);
    }
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
