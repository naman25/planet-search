import * as React from "react";
import { useHistory } from "react-router-dom";
import Routes from "../../root/routes";

export default function Page2(): React.ReactElement {
  const history = useHistory();

  return (
    <div>
      <h1>This is Page 2</h1>
      <button
        onClick={() => {
          history.push(Routes.Home);
        }}
      >
        Click to go back to home page
      </button>
    </div>
  );
}
