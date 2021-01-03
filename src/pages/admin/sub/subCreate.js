import React, { useState, useEffect } from "react";
import { AdminNav, LocalSearch } from "../../../components";
import { useSelector } from "react-redux";
import api from "../../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CategoryForm } from "../../../components";
//icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = useSelector((state) => state.user.token);

  //step1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadSubs();
    loadCategories();
  }, []);

  const loadSubs = async () => {
    try {
      const { data } = await api.sub.getSubs();
      setSubs(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

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
      const response = await api.sub.createSub({ name, selectedCategory }, token);
      toast.success(`${response.data.name} is created!`);
      loadSubs();
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
      if (window.confirm("Remove Sub?")) {
        setLoading(true);
        try {
          const response = await api.sub.removeSub(slug, token);
          toast.success(`${response.data.name} deleted!`);
          loadSubs();
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
            <h4>Create Sub</h4>
          )}

          <form>
            <div className="form-group">
              <label>Parent Category</label>
              <select
                name="categories"
                className="form-control"
                onChange={({ target }) => setSelectedCategory(target.value)}
              >
                {categories.length !== 0 &&
                  categories.map((c) => {
                    return <option key={c._id} value={c._id}>{c.name}</option>;
                  })}
              </select>
            </div>
          </form>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            title="Save"
          />

          <LocalSearch setKeyword={setKeyword} keyword={keyword} />
          {/* {subs.filter(searched(keyword)).map((c) => {
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
          })} */}
        </div>
      </div>
    </div>
  );
};
