import React, { useState, useEffect } from "react";
import { AdminNav } from "../../../components";
import { useSelector } from "react-redux";
import api from "../../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.user.token);

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
      loadCategories()
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
          loadCategories()
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

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={({ target }) => setName(target.value)}
            autoFocus
            required
          />
          <br />
          <button
            disabled={!name || name.length < 2}
            className="btn btn-outline-primary"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

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

          {categoryForm()}
          {categories.map((c) => {
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
                  to={`/category/${c.slug}`}
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

const СonfirmationWindow = (onClose, Remove) => {
  return <div className=""></div>;
};
