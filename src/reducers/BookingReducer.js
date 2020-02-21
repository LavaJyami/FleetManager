import {
  DatesChanged,
  MarkingChanged,
  DateUpdate,
  INITIATE_BOOKING,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  SHOW_CALENDAR_DATES,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAILURE,
  CALENDARDAYCLICKED,
  CLICKEDSTARTDATE,
  TOGGLECOUNTER,
  REQFROMCHANGED,
  REQTOCHANGED
} from '../actions/types';

const INITIAL_STATE = {
  dates: {},
  times: {},
  markingType: 'period',
  otherDates: {},
  loading: false,
  reqFromDate: '',
  reqToDate: '',
  counter: '1'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case DatesChanged:
      return { ...state, dates: action.payload };
    case TOGGLECOUNTER:
          return { ...state, counter: action.payload };
    case CLICKEDSTARTDATE:
        return { ...state, clickedstartdate: action.payload };
    case REQFROMCHANGED:
        return { ...state, reqFromDate: action.payload };
    case REQTOCHANGED:
        return { ...state, reqToDate: action.payload };
    case MarkingChanged:
      return { ...state, markingType: action.payload };
    case DateUpdate:
      return { ...state };
    case CALENDARDAYCLICKED:
        return { ...state };
    case INITIATE_BOOKING:
      return { ...state, loading: true };
    case BOOKING_SUCCESS:
      return { ...state, loading: false };
    case BOOKING_FAILURE:
      return { ...state, loading: false };
    case SHOW_CALENDAR_DATES:
      return { ...state, loading: true };
    case GET_BOOKINGS_SUCCESS:
        return { ...state, loading: false };
    case GET_BOOKINGS_FAILURE:
        return { ...state, loading: false };
    default:
      return state;
  }
};
