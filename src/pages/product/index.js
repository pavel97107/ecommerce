import React, { useState, useEffect } from "react";
import { AdminNav, LocalSearch } from "../../components";
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="product-title">Title</label>
              <input
                type="text"
                value={values.title}
                id="product-title"
                name="title"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc-product">Description</label>
              <input
                type="text"
                value={values.description}
                id="desc-product"
                name="description"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price-product">Price</label>
              <input
                type="number"
                id="price-product"
                name="price"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping-product">Shipping</label>
              <select
                className="form-control"
                id="shipping-product"
                name="shipping"
                onChange={handleChange}
              >
                <option>Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity-product">Quantity</label>
              <input
                type="number"
                id="quantity-product"
                name="quantity"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color-product">Color</label>
              <select
                className="form-control"
                id="color-product"
                name="color"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {values.colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="brand-product">Brand</label>
              <select
                className="form-control"
                id="brand-product"
                name="brand"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {values.brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-outline-info">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};
