import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api";

export default ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    try {
      api.auth.forgotPassword(email);
      setEmail("");
      setLoading((prev) => !prev);
      toast.success("Check your email and password reset link");
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />

        <br />

        <button type="submit" className="btn btn-raised" disabled={!email}>
          Send
        </button>
      </form>
    </div>
  );
};
