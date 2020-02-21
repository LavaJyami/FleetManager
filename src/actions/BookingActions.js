import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Alert } from 'react-native';
import { DatesChanged,
          MarkingChanged,
          DateUpdate,
          INITIATE_BOOKING,
          BOOKING_SUCCESS,
          BOOKING_FAILURE,
          SHOW_CALENDAR_DATES,
          GET_BOOKINGS_SUCCESS,
          GET_BOOKINGS_FAILURE,
          CLICKEDSTARTDATE,
          TOGGLECOUNTER,
          REQFROMCHANGED,
          REQTOCHANGED
        } from './types';


export const toggleCounter = (data) => {
  return {
    type: TOGGLECOUNTER,
    payload: data
  };
};

export const saveClickedStartDate = (date) => {
  return {
    type: CLICKEDSTARTDATE,
    payload: date
  };
};

export const reqfromchanged = (date) => {
  return {
    type: REQFROMCHANGED,
    payload: date
  };
};

export const reqtochanged = (date) => {
  return {
    type: REQTOCHANGED,
    payload: date
  };
};

export const datesChanged = (date) => {
  return {
    type: DatesChanged,
    payload: date
  };
};
export const markingChanged = (text) => {
  return {
    type: MarkingChanged,
    payload: text
  };
};

export const updateCalfrmDb = () => {
  return (dispatch) => {
    dispatch({ type: DateUpdate });
     axios({
      method: 'post',
      url: 'https://fleetmanager.stems-solutions.com/oauth/token',
      data: {

      }
    }).then(response => console.log(response))
    .catch(error => console.log(error));
};
};

export const bookIt = (startDate, endDate, startTime, endTime, vehicleId, userId) => {
  console.log(startDate + endDate + startTime + endTime + vehicleId + userId);
  return (dispatch) => {
    dispatch({ type: INITIATE_BOOKING });
     axios({
      method: 'post',
      url: 'https://fleetmanager.stems-solutions.com/book',
      data: {
        startDate,
        endDate,
        startTime,
        endTime,
        vehicleId,
        userId
      }
    }).then(response => bookingSuccess(dispatch, response))
    .catch(error => bookingFailure(dispatch, error));
};
};

export const bookingSuccess = (dispatch, response) => {
  Alert.alert(response.data.message);
  Actions.popTo('searchform');
  dispatch({
    type: BOOKING_SUCCESS,
});
};
export const bookingFailure = (dispatch, error) => {
  Alert.alert('Booking Failed. Please try again');
  console.log(error);
  dispatch({
    type: BOOKING_FAILURE,
  });
};
export const getBookings = (vehicleid) => {
  return (dispatch) => {
    dispatch({ type: SHOW_CALENDAR_DATES });
     axios({
      method: 'post',
      url: 'https://fleetmanager.stems-solutions.com/getcalendardates',
      data: {
        vehicleid
      }
    }).then(futureBookings => getBookingsSuccess(dispatch, futureBookings, vehicleid))
    .catch((error) => getBookingsFailure(dispatch, error));
};
};
const getBookingsSuccess = (dispatch, bookingDates, vehicleid) => {
  dispatch({ type: GET_BOOKINGS_SUCCESS });
  Actions.calendar({ vehicleid, bookingDates });
};
const getBookingsFailure = (dispatch, error) => {
  dispatch({ type: GET_BOOKINGS_FAILURE });
  Alert.alert('Error Occured. Please try again.');
  console.log(error);
  };
