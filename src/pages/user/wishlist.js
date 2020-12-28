import React from "react";
import { UserNav } from "../../components";

export default () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col">Wish List Page</div>
      </div>
    </div>
  );
};
