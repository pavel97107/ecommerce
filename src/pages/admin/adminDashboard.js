import React from "react";
import { AdminNav } from "../../components";
export default () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">Admin</div>
      </div>
    </div>
  );
};
