import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { configRegistration } from "../../../config";
import { useSelector } from "react-redux";

export default ({history}) => {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.sendSignInLinkToEmail(email, configRegistration);
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration`
      );
      localStorage.setItem("emailForRegistration", email);
    } catch (e) {
      toast.error(`${e.message}`);
    }
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        autoFocus
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Register / {email}
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};
