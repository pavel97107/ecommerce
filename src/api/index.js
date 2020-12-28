import axios from "axios";
import { auth, googleAuthProvider } from "../firebase";
import { configRegistration, configForgotPassword } from "../config";
import { toast } from "react-toastify";

export default {
  auth: {
    async sendSignInLinkToEmail(email) {
      await auth.sendSignInLinkToEmail(email, configRegistration);
    },
    async createOrUpdateUser(authtoken) {
      return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
          headers: {
            authtoken,
          },
        }
      );
    },
    async SignInWithEmailAndPassword(email, password) {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const { token } = await user.getIdTokenResult();
      return { user, token };
    },
    async SignInGoogle() {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const { token } = await user.getIdTokenResult();
      return { user, token };
    },

    async registerComplete(email, password) {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const { token } = await user.getIdTokenResult();
        return { user, token };
      }
    },
    async forgotPassword(email) {
      await auth.sendPasswordResetEmail(email, configForgotPassword);
    },
    async unsubscribe(dispatch) {
      return auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const { token } = await user.getIdTokenResult();
            const res = await this.currentUser(token);
            console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
      });
    },
    async currentUser(authtoken) {
      return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
          headers: {
            authtoken,
          },
        }
      );
    },
  },
  user: {
    async updatePassword(password, setLoading) {
      try {
        await auth.currentUser.updatePassword(password);
        toast.success("Password updated");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading((loading) => !loading);
      }
    },
  },
  admin: {
    async currentAdmin(authtoken) {
      return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
          headers: {
            authtoken,
          },
        }
      );
    },
  },
};
