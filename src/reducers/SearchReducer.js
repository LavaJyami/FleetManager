import {
  SEARCH,
  SEARCH_SUCCESS,
  VEHICLE_TYPE_CHANGED,
  REQUIRED_FROM_CHANGED,
  DURATION_OF_HIRE_CHANGED,
  DATE_PICKER_VISIBLE,
  REQUIRED_TO_CHANGED,
  INPUT_TIME_CHANGED,
  COLLAPSED,
  SEARCH_FAILURE,
  TIMEOUT,
  REDGSEARCH,
  REDG_SEARCH_SUCCESS,
  REDG_SEARCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  vehicletype: '',
  requiredfrom: '',
  durationofhire: '',
  shift: '',
  reqfromdate: '',
  isDateTimePickerVisible: false,
  reqTodate: '',
  loading: '',
  collapse: true,
  searchresult: '',
  redgsearchresult: '',
  itemChosen: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case COLLAPSED:
    return { ...state, collapse: true };
    case VEHICLE_TYPE_CHANGED:
    return { ...state, [action.payload.prop]: action.payload.value };
    case REQUIRED_FROM_CHANGED:
      return { ...state, reqfromdate: action.payload.value, collapse: false };
    case REQUIRED_TO_CHANGED:
      return { ...state, reqTodate: action.payload.value };
    case DATE_PICKER_VISIBLE:
      return { ...state, isDateTimePickerVisible: true };
    case INPUT_TIME_CHANGED:
        return { ...state, reqTime: action.payload.value };
    case DURATION_OF_HIRE_CHANGED:
      return { ...state, durationofhire: action.payload };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, searchresult: action.payload, collapse: true };
    case SEARCH_FAILURE:
        return { ...state, loading: false, collapse: false };
    case SEARCH:
      return { ...state, loading: true };
    case REDGSEARCH:
      return { ...state, loading: true };
    case REDG_SEARCH_SUCCESS:
      return { ...state, loading: false, redgsearchresult: action.payload };
    case REDG_SEARCH_FAILURE:
        return { ...state, loading: false };
    case TIMEOUT:
        return { ...state, loading: false };
    default:
      return state;
  }
};
