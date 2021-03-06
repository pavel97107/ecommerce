import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";

export default ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Emais and password is required");
      return;
    }
    try {
      const { user, token } = await api.auth.registerComplete(email, password);
      const { data } = await api.auth.createOrUpdateUser(token);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: data.user.name,
          email: user.email,
          token,
          role: data.user.role,
          _id: data.user._id,
        },
      });
      history.push("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};
