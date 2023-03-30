import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../FireBase/config";
import {
  updateUserProfile,
  updateIsLoginChange,
  signOutProfile,
} from "./authSlice";

import { onAuthStateChanged } from "firebase/auth";

const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getStore) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const user = await auth.currentUser;

      const userId = user.uid;
      const nickName = user.displayName;
      await dispatch(updateUserProfile({ userId, nickName }));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getStore) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getStore) => {
  try {
    await signOut(auth);
    dispatch(signOutProfile());
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};
const authIsLoginChange = () => async (dispatch, getStore) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const nickName = user.displayName;
      dispatch(updateUserProfile({ userId, nickName }));
      dispatch(updateIsLoginChange({ stateChange: true }));
    }
  });
};

export { authSignUpUser, authSignInUser, authSignOutUser, authIsLoginChange };
