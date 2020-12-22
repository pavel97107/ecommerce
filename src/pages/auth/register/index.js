import React, { useState } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export default () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
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
