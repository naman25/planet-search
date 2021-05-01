import axios from "axios";
import * as React from "react";
import {
  AppliedFilters,
  FieldNamesProps,
  FilterProps,
} from "../../consts/interface";
import FilterBox from "../filter-box/filter-box";
import Search from "../search/search";
import "./home.scss";

export default function Home(): React.ReactElement {
  const [searchTexts, setSearchTexts] = React.useState("");
  const [filters, setFilters] = React.useState<FilterProps[]>(null);
  const [appliedFilters, setAppliedFilters] = React.useState<AppliedFilters>({
    color: [],
    shape: [],
    size: [],
  });
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchTexts(event.currentTarget.value);
  };
  const changeFiltersState = (key: string, id: string, checked: boolean) => {
    let tempFilter = appliedFilters;
    if (checked) {
      tempFilter[key].push(id);
    } else {
      tempFilter[key] = tempFilter[key].filter((item: string) => {
        return item !== id;
      });
    }
    setAppliedFilters(tempFilter);
    console.log(appliedFilters);
    searchApiCall();
  };

  React.useEffect(() => {
    let shapes = axios.get<FieldNamesProps[]>(`http://localhost:3000/shapes`);
    let colors = axios.get<FieldNamesProps[]>(`http://localhost:3000/colors`);
    let size = axios.get<FieldNamesProps[]>(`http://localhost:3000/sizes`);
    Promise.all([shapes, colors, size]).then(
      ([shapeResult, colorResult, sizeResult]) => {
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
      },
    );
  }, []);

  const searchApiCall = () => {
    let params = new URLSearchParams();
    searchTexts && params.set("q", searchTexts);
    for (let key in appliedFilters) {
      if (appliedFilters[key].length > 0) {
        params.set(key, appliedFilters[key].toString());
      }
    }
    axios
      .get(`http://localhost:3000/planets?${params.toString()}`)
      .then((result) => {
        // console.log(result.data);
      });
  };

  React.useEffect(() => {
    console.log(appliedFilters);
  }, [appliedFilters]);
  React.useEffect(() => {
    searchApiCall();
  }, [searchTexts]);

  return (
    <div className="container">
      <Search
        searchTexts={searchTexts}
        onSearchTextChange={handleSearchTextChange}
      ></Search>
      <FilterBox
        filters={filters}
        changeFiltersState={changeFiltersState}
      ></FilterBox>
    </div>
  );
}
