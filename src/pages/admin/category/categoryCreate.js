import React, { useState, useEffect } from "react";
import { AdminNav } from "../../../components";
import { useSelector } from "react-redux";
import api from "../../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CategoryForm } from "../../../components";
//icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default (props) => {
  console.log(props);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.user.token);

  //step1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await api.category.getCategories(token);
      setCategories(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.category.createCategory({ name }, token);
      console.log(response);
      toast.success(`${response.data.name} is created!`);
      loadCategories();
    } catch (err) {
      if (err.response.status === 400) {
        return toast.error(err.response.data.message);
      }
      toast.error(err.message);
    } finally {
      setName("");
      setLoading(false);
    }
  };

  const handleRemove = (slug) => {
    return async () => {
      if (window.confirm("Remove category?")) {
        setLoading(true);
        try {
          const response = await api.category.removeCategory(slug, token);
          toast.success(`${response.data.name} deleted!`);
          loadCategories();
        } catch (err) {
          if (err.response.status === 400) {
            return toast.error(err.response.data.message);
          }
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            title="Save"
          />

          <input
            type="text"
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Filter"
            className="form-control"
          />
          {categories.filter(searched(keyword)).map((c) => {
            return (
              <div key={c._id} className="alert alert-secondary">
                {c.name}
                <span
                  onClick={handleRemove(c.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link
                  to={`/admin/category/${c.slug}`}
                  className="btn btn-sm float-right"
                >
                  <EditOutlined className="text-warning" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
