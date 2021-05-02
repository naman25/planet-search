import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";

export interface SearchProps {
  searchTexts?: string;
  onEnter: () => void;
  onSearchTextChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      margin: "20px",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Planets"
        inputProps={{ "aria-label": "search planets" }}
        onChange={props.onSearchTextChange}
        onKeyPress={(event) => {
          if (event.charCode === 13) {
            event.preventDefault();
            props.onEnter();
          }
        }}
        value={props.searchTexts || ""}
      />
      <IconButton
        onClick={props.onEnter}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
