import React, { useState } from "react";
import api from "../../api";
import { UserNav } from "../../components";

export default () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api.user.updatePassword(password, setLoading);
  };

  const passportUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          disabled={loading}
          onChange={({ target }) => setPassword(target.value)}
          className="form-control"
          value={password}
          placeholder="Enter new password"
        />
        <button
          disabled={!password || password.length < 6 || loading}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passportUpdateForm()}
        </div>
      </div>
    </div>
  );
};
