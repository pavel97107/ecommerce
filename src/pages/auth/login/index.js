import React, { useState, useEffect } from "react";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../../../api";

export default ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const setUser = (data, user, token) => {
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
  };

  const roleBasedRedicrect = (res) => {
    if (res.data.user.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    try {
      const { user, token } = await api.auth.SignInWithEmailAndPassword(
        email,
        password
      );
      const { data } = await api.auth.createOrUpdateUser(token);
      setUser(data, user, token);
      roleBasedRedicrect({ data });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  const googleLogin = async () => {
    setLoading((prev) => !prev);
    try {
      const { user, token } = await api.auth.SignInGoogle();
      const { data } = await api.auth.createOrUpdateUser(token);
      setUser(data, user, token);
      history.push("/");
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          autoFocus
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />
      <Button
        type="primary"
        className="mb-3"
        block
        size="large"
        disabled={!email || password.length < 6 || loading}
        onClick={handleSubmit}
        icon={<MailOutlined />}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>{loading ? "Loading..." : "Login"}</h4>
          {loginForm()}
          <Button
            type="danger"
            className="mb-3"
            block
            size="large"
            onClick={googleLogin}
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right">
            forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};
