import React, { useState, useEffect } from "react";
import { AdminNav, LocalSearch, ProductCreateForm } from "../../components";
import { useSelector } from "react-redux";
import api from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CategoryForm } from "../../components";
//icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Microsoft", "Samsung", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

export default () => {
  const [values, setValues] = useState(initialState);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.product.createProduct(values, token);
      toast.success(`${response.data.title} is created!`);
      console.log(response);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <hr />
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};
