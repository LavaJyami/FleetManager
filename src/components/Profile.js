import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { regdVehicleSearch } from '../actions';

class Profile extends Component {
  login() {
    Actions.main1();
  }
  logout() {
    this.props.logout();
  }
  tnc() {

  }
  contact() {

  }
  signup() {

  }
  vehicles() {
    //goto my_vehicles component page
    // const owner = this.props.user.email;
    // this.props.regdVehicleSearch({ owner });
    Actions.myvehicles();
  }
  renderLoginButton() {
    if (this.props.loggedin) {
    return (
      <View>
      <TouchableOpacity onPress={this.logout.bind(this)}>
       <Text style={styles.profileTextFirst}>
         Logout
       </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.vehicles.bind(this)}>
     <Text style={styles.profileText}>
       Registered Vehicles
     </Text>
     </TouchableOpacity>
    <TouchableOpacity onPress={this.tnc.bind(this)}>
     <Text style={styles.profileText}>
       Terms and Conditions
     </Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={this.contact.bind(this)}>
      <Text style={styles.profileText}>
        Contact Support
      </Text>
      </TouchableOpacity>
    </View>
    );
  }
  return (
    <View>
    <TouchableOpacity onPress={this.login.bind(this)}>
     <Text style={styles.profileTextFirst}>
       Login
     </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={this.signup.bind(this)}>
   <Text style={styles.profileText}>
     Signup
   </Text>
</TouchableOpacity>
</View>
  );
  }
  render() {
      return (
        <View>
        {this.renderLoginButton()}
        </View>
      );
  }

}
const styles = {
  profileText: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 30
  },
  profileTextFirst: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 100
  }
};
const mapStateToProps = (state) => {
  const { loggedin, user } = state.auth;
  return { loggedin, user };
};

export default connect(mapStateToProps, { regdVehicleSearch })(Profile);
