import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import AddVehicleForm from './AddVehicleForm';
import SignupReducer from './SignupReducer';
import BookingReducer from './BookingReducer';

export default combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
  addvehicle: AddVehicleForm,
  signup: SignupReducer,
  booking: BookingReducer
});
