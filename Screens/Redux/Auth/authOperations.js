import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../FireBase/config";

const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getStore) => {
    console.log(email, password, login);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("operations user", user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getStore) => {
    console.log(email, password);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("operations user", user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getStore) => {};

export { authSignUpUser, authSignInUser, authSignOutUser };
