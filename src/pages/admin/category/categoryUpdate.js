import React, { useState, useEffect } from "react";
import { AdminNav } from "../../../components";
import { useSelector } from "react-redux";
import api from "../../../api";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
//icons

export default () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user.token);
  const { slug } = useParams();
  const history = useHistory();
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await api.category.getCategory(slug, token);
      setName(data.name);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.category.updateCategory(slug, { name }, token);
      toast.success(`${response.data.name} is updated!`);
      history.push("/admin/category");
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

  // const handleRemove = (slug) => {
  //   return async () => {
  //     if (window.confirm("Remove category?")) {
  //       setLoading(true);
  //       try {
  //         const response = await api.category.removeCategory(slug, token);
  //         toast.success(`${response.data.name} deleted!`);
  //         loadCategories()
  //       } catch (err) {
  //         if (err.response.status === 400) {
  //           return toast.error(err.response.data.message);
  //         }
  //         toast.error(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };
  // };

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
            Update
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
            <h4>Update Category</h4>
          )}
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};
