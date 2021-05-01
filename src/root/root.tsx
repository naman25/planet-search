import * as H from "history";
import * as React from "react";
import { hot } from "react-hot-loader";
import {
  BrowserRouter,
  match,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../components/home/home";
import Page1 from "../components/page1/page1";
import Page2 from "../components/page2/page2";
import Routes from "./routes";

export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppRouteProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReactRouterDomProps
  extends RouteComponentProps<AppRouteProps> {}

// URL format
const Root: React.FC<unknown> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.Home} component={Home} />
        <Route path={Routes.Page1} component={Page1} />
        <Route path={Routes.Page2} component={Page2} />
        <Redirect from="/" to={Routes.Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(module)(Root);
