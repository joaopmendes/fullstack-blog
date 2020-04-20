import { AuthActionTypes } from './auth.types';
import {getUserData} from "../../api/auth";
export const updateUserData = () => async (dispatch, getState) => {
  const {auth} = getState();
  if(auth.userLoggedIn) {
    const data = await getUserData(auth.user.accessToken);
    console.log(data)
    if(data) {
      const payload = {
        name: data.name,
        email: data.email,
        isAdmin: data.admin,
        accessToken: data.accessToken,
        posts: data.posts,
        profilePicture: data.profilePicture,
        // eslint-disable-next-line
        id: data._id,
      };
      dispatch(login(payload));
      login()
    }
  }
}
export const login = (payload) => ({
  type: AuthActionTypes.LOGIN_USER,
  payload,
});
export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});
