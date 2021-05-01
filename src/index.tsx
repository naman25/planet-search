import * as React from "react";
import { render } from "react-dom";
import Root from "./root/root";

const body = document.body;
body.style.margin = "0px";
const rootEl = document.getElementById("root");

render(<Root />, rootEl);
