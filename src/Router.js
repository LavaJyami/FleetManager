import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import ForgotPassword from './components/ForgotPassword';
import SearchResults from './components/SearchResults';
import AddVehicle from './components/AddVehicle';
import VehicleDetail from './components/VehicleDetail';
import SignUpForm from './components/SignUpForm';
import TabIcon from './components/TabIcon';
import Notifications from './components/Notifications';
import BookingCalendar from './components/BookingCalendar';
import Profile from './components/Profile';
import MyVehicles from './components/MyVehicles';
import EditVehicle from './components/EditVehicle';

const RouterComponent = () => {
  return (
 <Router
 sceneStyle={{ paddingTop: 0 }}
 navigationBarStyle={{ backgroundColor: '#ffffff' }}
 barButtonIconStyle={{ tintColor: '#39e3a3' }}
 borderBottomWidth='0'
 >
    <Scene key='root' tabs >
        <Scene key='tab1' title="Search" iconName="search" icon={TabIcon}>
              <Scene key="searchform" component={SearchForm} title="Search" />
              <Scene key="searchResults" component={SearchResults} title="Search Results" />
              <Scene key="vehicleDetail" component={VehicleDetail} title="Vehicle Details" />
              <Scene hideNavBar key="calendar" component={BookingCalendar} title="Select Date" />
              <Scene key="main1" component={LoginForm} title="Login" />
              <Scene key="signup1" component={SignUpForm} title="Signup" />
              <Scene key="forgotpwd1" component={ForgotPassword} title="Reset Password" />
        </Scene>
        <Scene key='tab2' title='My Profile' iconName="user" icon={TabIcon}>
              <Scene key="main" component={Profile} title="Profile" />
              <Scene
              key="myvehicles"
              component={MyVehicles}
              title="My Vehicles"
              onRight={() => Actions.addvehicle()}
              rightButtonImage={require('./assets/addVehicleIcon.png')} />
              <Scene key="vehicleDetail1" component={VehicleDetail} title="Vehicle Details" />
              <Scene key="addvehicle" component={AddVehicle} title="Add Vehicle" />
              <Scene key="editvehicle" component={EditVehicle} title="Edit Vehicle" />
              <Scene key="main2" component={LoginForm} title="Login" />
              <Scene key="signup1" component={SignUpForm} title="Signup" />
              <Scene key="forgotpwd1" component={ForgotPassword} title="Reset Password" />
        </Scene>
        <Scene key='tab4' title='Notifications' iconName="bell" component={Notifications} icon={TabIcon}/>

    </Scene>

  </Router>
  );
};


export default RouterComponent;
