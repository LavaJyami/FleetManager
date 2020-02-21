import { Alert } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  IMAGE_PICKED,
  ADD_VEHICLE_TYPE_CHANGED,
  MANUFACTURER_CHANGED,
  CAPACITY_CHANGED,
  ADDVEHICLESUBMIT,
  REG_CHANGED,
  VEHICLE_ADD_SUCCESS,
  VEHICLE_ADD_FAILURE,
  REDG_SEARCH_SUCCESS,
  REDG_SEARCH_FAILURE
 } from './types';


export const imagePicked = (text) => {
  return {
    type: IMAGE_PICKED,
    payload: text
  };
};

export const addvehicleTypeChanged = ({ prop, value }) => {
  return {
    type: ADD_VEHICLE_TYPE_CHANGED,
    payload: { prop, value }
  };
};

export const manufacturerChanged = (text) => {
  return {
    type: MANUFACTURER_CHANGED,
    payload: text
  };
};

export const regChanged = (text) => {
  return {
    type: REG_CHANGED,
    payload: text
  };
};
export const capacityChanged = ({ prop, value }) => {
  return {
    type: CAPACITY_CHANGED,
    payload: { prop, value }
  };
};


export const submitAddVehicle = ({
                              email,
                              vehicletype,
                              manufacturer,
                              capacity,
                              reg,
                              uri }) => {
  return (dispatch) => {
    dispatch({ type: ADDVEHICLESUBMIT });

        const data = new FormData();
        data.append('email', email);

        data.append('vehicletype', vehicletype);
        data.append('capacity', capacity);
        data.append('manufacturer', manufacturer);
        data.append('reg', reg);
        data.append('photo', {
            uri,
            type: 'image/jpeg',
            name: 'vechiclephotos'
          });
          console.log('sent data');
                console.log(data);
        fetch('https://fleetmanager.stems-solutions.com/addvehicle', {
        method: 'post',
        headers: {
        Accept: 'multipart/form-data',
        // Authorization: `Bearer ${token}`,
        },
        body: data
        })
        .then(res => vehicleaddSuccess(dispatch, res, email))
        .catch(err => vehicleaddFailure(dispatch, err));
};
};

 const vehicleaddSuccess = (dispatch, res, email) => {
   dispatch({
     type: VEHICLE_ADD_SUCCESS,
   });
   axios({
   method: 'post',
   url: 'https://fleetmanager.stems-solutions.com/ownervechsearch',
   headers: {
     Accept: 'application/json',
     // Authorization: `Bearer ${token}`,
   },
   data: {
     owner: email
   }
 })
 .then(responseJson => Actions.myvehicles(responseJson))
 .catch((error) => console.log(error));
  // Alert.alert('Vehicle added sucessfully!');
  console.log(res);
};


 const vehicleaddFailure = (dispatch, err) => {
  dispatch({
    type: VEHICLE_ADD_FAILURE,
  });
  Alert.alert('Error Occured. Please check your network connection and try again!');
  console.log(err);
};
