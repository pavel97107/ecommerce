import React from "react";
import { UserNav } from "../../components";

export default () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User History Page</div>
      </div>
    </div>
  );
};
