import {
IMAGE_PICKED,
ADD_VEHICLE_TYPE_CHANGED,
MANUFACTURER_CHANGED,
CAPACITY_CHANGED,
ADDVEHICLESUBMIT,
REG_CHANGED,
VEHICLE_ADD_SUCCESS,
VEHICLE_ADD_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  picked_image_uri: '',
  vehicletype: '',
  manufacturer: '',
  capacity: '',
  loading: false,
  reg: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case IMAGE_PICKED:
    return { ...state, picked_image_uri: action.payload };
    case ADD_VEHICLE_TYPE_CHANGED:
    return { ...state, [action.payload.prop]: action.payload.value };
    case CAPACITY_CHANGED:
    return { ...state, [action.payload.prop]: action.payload.value };
    case MANUFACTURER_CHANGED:
    return { ...state, manufacturer: action.payload };
    case REG_CHANGED:
    return { ...state, reg: action.payload };
    case ADDVEHICLESUBMIT:
    return { ...state, loading: true };
    case VEHICLE_ADD_SUCCESS:
    return { ...state, loading: false, picked_image_uri: '', capacity: '', manufacturer: '', reg: '', vehicletype: '' };
    case VEHICLE_ADD_FAILURE:
    return { ...state, loading: false };
    default:
      return state;
  }
};
