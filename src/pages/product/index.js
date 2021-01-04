import React, { useState, useEffect } from "react";
import { AdminNav, LocalSearch } from "../../components";
import { useSelector } from "react-redux";
import api from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CategoryForm } from "../../components";
//icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
            Product
        </div>
      </div>
    </div>
  );
};
