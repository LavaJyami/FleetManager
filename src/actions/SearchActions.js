import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  VEHICLE_TYPE_CHANGED,
  REQUIRED_FROM_CHANGED,
  DURATION_OF_HIRE_CHANGED,
  REQUIRED_TO_CHANGED,
  COLLAPSED,
  TIMEOUT,
  REDGSEARCH,
  REDG_SEARCH_SUCCESS,
  REDG_SEARCH_FAILURE
 } from './types';

export const collapsed = () => {
    return {
      type: COLLAPSED
    };
};

 export const vehicleTypeChanged = ({ prop, value }) => {
   return {
     type: VEHICLE_TYPE_CHANGED,
     payload: { prop, value }
   };
 };

 export const requiredFromChanged = ({ value }) => {
   return {
     type: REQUIRED_FROM_CHANGED,
     payload: { value }
   };
 };

 export const requiredToChanged = ({ value }) => {
   return {
     type: REQUIRED_TO_CHANGED,
     payload: { value }
   };
 };


 export const durationOfHireChanged = (text) => {
   return {
     type: DURATION_OF_HIRE_CHANGED,
     payload: text
   };
 };

 export const search = ({ token, vehicleType, reqTodate, reqfromdate }) => {
   return (dispatch) => {
     dispatch({ type: SEARCH });
     axios({
     method: 'post',
     url: 'https://fleetmanager.stems-solutions.com/search',
     headers: {
       Accept: 'application/json',
       Authorization: `Bearer ${token}`,
     },
     data: {
       Vehicle: vehicleType,
       DateTo: reqTodate,
       DateFrom: reqfromdate
     }
   })
   .then(responseJson => searchSuccess(dispatch, responseJson))
   .catch((error) => searchFailure(dispatch, error));
 };
 };
export const searchSuccess = (dispatch, responseJson) => {
  dispatch({
    type: SEARCH_SUCCESS,
    payload: responseJson
  });
  console.log(responseJson.data);
  // Actions.searchResults(responseJson.data);
};
export const searchFailure = (dispatch, error) => {
  Alert.alert('Something went wrong. Please try again.');
  console.log(error);
  dispatch({
    type: SEARCH_FAILURE,
  });
};
export const timeOut = () => {
  return (
    {
      type: TIMEOUT
    }
  );
};

export const regdVehicleSearch = ({ owner }) => {
  return (dispatch) => {
    dispatch({ type: REDGSEARCH });
    axios({
    method: 'post',
    url: 'https://fleetmanager.stems-solutions.com/ownervechsearch',
    headers: {
      Accept: 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    data: {
      owner
    }
  })
  .then(responseJson => redgsearchSuccess(dispatch, responseJson))
  .catch((error) => redgsearchFailure(dispatch, error));
};
};
export const redgsearchSuccess = (dispatch, responseJson) => {
 dispatch({
   type: REDG_SEARCH_SUCCESS,
   payload: responseJson
 });
 Actions.myvehicles();
};
export const redgsearchFailure = (dispatch, error) => {
 Alert.alert('Something went wrong. Please try again.');
 console.log(error);
 dispatch({
   type: REDG_SEARCH_FAILURE,
 });
};
