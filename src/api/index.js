import axios from "axios";
import { auth, googleAuthProvider } from "../firebase";
import { configRegistration, configForgotPassword } from "../config";

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
  },
};
