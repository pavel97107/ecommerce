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
  category: {
    async getCategories(authtoken) {
      return await axios.get(`${process.env.REACT_APP_API}/categories`, {
        headers: {
          authtoken,
        },
      });
    },
    async getCategory(slug, authtoken) {
      return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
          authtoken,
        },
      });
    },
    async createCategory(category, authtoken) {
      return await axios.post(
        `${process.env.REACT_APP_API}/category`,
        {
          ...category,
        },
        {
          headers: {
            authtoken,
          },
        }
      );
    },
    async updateCategory(slug, category, authtoken) {
      return await axios.put(
        `${process.env.REACT_APP_API}/category/${slug}`,
        {
          ...category,
        },
        {
          headers: {
            authtoken,
          },
        }
      );
    },
    async removeCategory(slug, authtoken) {
      return await axios.delete(
        `${process.env.REACT_APP_API}/category/${slug}`,
        {
          headers: {
            authtoken,
          },
        }
      );
    },
  },
  sub: {
    async getSubs() {
      return await axios.get(`${process.env.REACT_APP_API}/subs`);
    },
    async getSub(slug) {
      return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
    },
    async createSub(sub, authtoken) {
      return await axios.post(
        `${process.env.REACT_APP_API}/sub`,
        {
          ...sub,
        },
        {
          headers: {
            authtoken,
          },
        }
      );
    },
    async updateSub(slug, sub, authtoken) {
      return await axios.put(
        `${process.env.REACT_APP_API}/sub/${slug}`,
        {
          ...sub,
        },
        {
          headers: {
            authtoken,
          },
        }
      );
    },
    async removeSub(slug, authtoken) {
      return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
          authtoken,
        },
      });
    },
  },
  product: {
    createProduct(product, authtoken) {
      return axios.post(
        `${process.env.REACT_APP_API}/product`,
        {
          ...product,
        },
        {
          headers: {
            authtoken,
          },
        }
      );
    },
    getProducts() {
      return axios.get(`${process.env.REACT_APP_API}/products`);
    },
  },
};
