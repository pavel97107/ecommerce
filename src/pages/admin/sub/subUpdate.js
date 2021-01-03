import React, { useState, useEffect } from "react";
import { AdminNav, LocalSearch } from "../../../components";
import { useSelector } from "react-redux";
import api from "../../../api";
import { toast } from "react-toastify";
import { Link, useHistory, useParams } from "react-router-dom";
import { CategoryForm } from "../../../components";
//icons

export default () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = useSelector((state) => state.user.token);

  const { slug } = useParams();
  const history = useHistory();
  console.log(slug);

  useEffect(() => {
    loadSubs();
    loadCategories();
  }, []);

  const loadSubs = async () => {
    try {
      const { data } = await api.sub.getSub(slug);
      console.log(data);
      setName(data.name);
      setSelectedCategory(data.parent);
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
      const response = await api.sub.updateSub(
        slug,
        { name, selectedCategory },
        token
      );
      toast.success(`${response.data.name} is updated!`);
      return history.push('/admin/sub')
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
            <h4>Update Sub</h4>
          )}

          <form>
            <div className="form-group">
              <label>Update Parent Category</label>
              <select
                name="categories"
                className="form-control"
                onChange={({ target }) => setSelectedCategory(target.value)}
              >
                <option value="">Please Select</option>
                {categories.length !== 0 &&
                  categories.map((c) => {
                    return (
                      <option key={c._id} value={c._id} selected={selectedCategory === c._id}>
                        {c.name}
                      </option>
                    );
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
        </div>
      </div>
    </div>
  );
};
