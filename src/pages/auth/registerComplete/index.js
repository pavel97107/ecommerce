import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export default ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;

        await user.updatePassword(password);
        const token = await user.getIdTokenResult();
        console.log("user", user);
        console.log("token", token);
        //dispath({type: "USER", payload: {token}})
        history.push("/");
      }
    } catch (e) {
      console.error(e);
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
