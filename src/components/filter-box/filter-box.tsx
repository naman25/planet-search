import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { AppliedFilters, FilterProps } from "../../consts/interface";
import useWindowDimensions from "../../consts/window-size";
import "./filter-box.scss";

export interface SearchProps {
  filters?: FilterProps[];
  appliedFilter?: AppliedFilters;
  changeFiltersState: (key: string, id: string, checked: boolean) => void;
}
const useStyles = makeStyles({
  list: {
    width: 250,
    minWidth: 250,
  },
  fullList: {
    width: "auto",
    minWidth: 250,
  },
  iconButton: {
    padding: 10,
  },
});

type Anchor = "top" | "left" | "bottom" | "right";
const FilterBox: React.FC<SearchProps> = (props: SearchProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { height, width } = useWindowDimensions();
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const filterUI = () => {
    return (
      <div className="filter-container">
        {props.filters.map((filter) => {
          return (
            <>
              <div className="header">{filter.headerName}</div>
              {filter.fields.map((field) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      checked={
                        props.appliedFilter[filter.queryParamsId].indexOf(
                          field.id,
                        ) !== -1
                      }
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
              <Divider />
            </>
          );
        })}
      </div>
    );
  };
  if (props.filters === null) {
    return null;
  }
  if (width <= 480) {
    const anchor: Anchor = "left";
    return (
      <React.Fragment key={anchor}>
        <IconButton
          onClick={toggleDrawer(anchor, true)}
          className={classes.iconButton}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          <span className="title-container">
            <h2>Filters</h2>
            <IconButton
              onClick={toggleDrawer(anchor, false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </span>
          {filterUI()}
        </Drawer>
      </React.Fragment>
    );
  }
  return <>{filterUI()}</>;
};

export default FilterBox;
