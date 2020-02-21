import {
  PHONE_CHANGED,
  NAME_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  SNPASSWORD_CHANGED,
  SNEMAIL_CHANGED,
  SIGNUP,
  SIGNUP_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  confirmpassword: '',
  name: '',
  phone: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmpassword: action.payload };
    case SNPASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SNEMAIL_CHANGED:
      return { ...state, email: action.payload };
    case SIGNUP:
      return { ...state, loading: true };
    case SIGNUP_FAIL:
      return { ...state, loading: false, error: 'SignUp Failed' };
    default:
      return state;
  }
};
