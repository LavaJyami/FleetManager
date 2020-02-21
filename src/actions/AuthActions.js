import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  FORGOT_EMAIL_CHANGED,
  FORGOT_PASSWORD_CHANGED,
  FORGOT_PASSWORD_CONFIRM_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_FACEBOOK_USER,
  FB_LOGIN_USER_SUCCESS,
  LOGOUT,
  UPDATE_USERINFO
 } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const forgotemailChanged = (text) => {
  return {
    type: FORGOT_EMAIL_CHANGED,
    payload: text
  };
};
export const forgotPassChanged = (text) => {
  return {
    type: FORGOT_PASSWORD_CHANGED,
    payload: text
  };
};
export const forgotConPassChanged = (text) => {
  return {
    type: FORGOT_PASSWORD_CONFIRM_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    axios({
    method: 'post',
    url: 'https://fleetmanager.stems-solutions.com/oauth/token',
    data: {
      username: email,
      password,
      grant_type: 'password',
      client_id: '4',
      client_secret: 'uMylsqMhByou8HorOCb6nvZxQTdmAJtfbHJLsAsP',
      scope: '*'
    }
  }).then(response => loginUserSuccess(dispatch, response, email))
  .catch(error => loginUserFail(dispatch, error));
};
};

export const loginFacebookUser = (userData) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_FACEBOOK_USER,
    payload: userData });
    axios({
    method: 'post',
    url: 'https://fleetmanager.stems-solutions.com/callback/facebook',
    data: userData
  }).then(response => fbloginUserSuccess(dispatch, response, userData))
  .catch(error => loginUserFail(dispatch, error));
};
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
});
};

const loginUserSuccess = (dispatch, response, email) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: response.data.access_token
  });
  axios({
  method: 'post',
  url: 'https://fleetmanager.stems-solutions.com/getuserdetails',
  headers: {
    Accept: 'application/json',
   Authorization: `Bearer ${response.data.access_token}`,
  },
  data: {
  email
  }
})
.then(userdata => updateUserinfo(dispatch, userdata.data.user[0].id))
.catch((error) => console.log(error));
  Actions.pop();
};
const fbloginUserSuccess = (dispatch, response, userData) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: response.data
  });
  axios({
  method: 'post',
  url: 'https://fleetmanager.stems-solutions.com/getuserdetails',
  headers: {
    Accept: 'application/json',
   Authorization: `Bearer ${response.data.access_token}`,
  },
  data: {
  email: userData.profile.email
  }
})
.then(userdata => updateUserinfo(dispatch, userdata.data.user[0]))
.catch((error) => console.log(error));
  Actions.pop();
};
const updateUserinfo = (dispatch, response) => {
  dispatch({
    type: UPDATE_USERINFO,
    payload: response
  });
};


export const forgotPassword = ({ forgotemail, forgotpassword, forgotconpassword }) => {
return (dispatch) => {
dispatch({ type: RESET_PASSWORD });

  axios({
  method: 'post',
  url: 'https://fleetmanager.stems-solutions.com/password/email',
  data: {
    email: forgotemail,
  }
}).then(response => {
  axios({
  method: 'post',
  url: 'https://fleetmanager.stems-solutions.com/password/reset',
  data: {
    email: forgotemail,
    password: forgotpassword, //need to add
    password_confirmation: forgotconpassword, //need to add
    token: response.data.token
  }
}).then(resetPasswordSuccess(dispatch)).catch(() => console.log(response));
}).catch(() => Alert.alert('Something went wrong. Please try again.'));
};
};

const resetPasswordSuccess = (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_SUCCESS,
  });
  Actions.main();
};

export const logout = () => {
  return ({
    type: LOGOUT,
  });
};
