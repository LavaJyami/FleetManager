import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD,
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
} from '../actions/types';

const INITIAL_STATE = {
  forgotemail: '',
  forgotpassword: '',
  forgotconpassword: '',
  resetpasswordloading: '',
  email: '',
  password: '',
  user: '',
  token: '',
  error: '',
  loading: false,
  loggedin: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case FORGOT_EMAIL_CHANGED:
      return { ...state, forgotemail: action.payload };
    case FORGOT_PASSWORD_CHANGED:
      return { ...state, forgotpassword: action.payload };
    case FORGOT_PASSWORD_CONFIRM_CHANGED:
      return { ...state, forgotconpassword: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, token: action.payload, error: '', loading: false, loggedin: true };
    case FB_LOGIN_USER_SUCCESS:
      return { ...state, token: action.payload, error: '', loading: false, loggedin: true };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGOUT:
      return { ...state, loggedin: false };
    case RESET_PASSWORD:
      return { ...state, resetpasswordloading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetpasswordloading: false, error: '' };
    case RESET_PASSWORD_FAILURE:
      return { ...state, resetpasswordloading: false, error: '' };
    case LOGIN_FACEBOOK_USER:
      return { ...state, loading: true, error: '', user: action.payload };
    case UPDATE_USERINFO:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
