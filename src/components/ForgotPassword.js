import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import {
   resetpasswordloading,
   forgotemailChanged,
   forgotPassChanged,
   forgotConPassChanged,
   forgotPassword
 } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';


class ForgotPassword extends Component {
onForgotEmailChange(text) {
  this.props.forgotemailChanged(text);
}
onForgotPasswordChange(text) {
  this.props.forgotPassChanged(text);
}
onForgotPasswordConfirmChange(text) {
  this.props.forgotConPassChanged(text);
}

onButtonPress() {
  const { forgotemail, forgotpassword, forgotconpassword } = this.props;

  if (this.props.forgotpassword === this.props.forgotconpassword) {
    this.props.forgotPassword({ forgotemail, forgotpassword, forgotconpassword });
  } else {
    Alert.alert(
  'Invalid Entry',
  'Retype Passwords',
  { cancelable: false }
);
}
}


renderButton() {
  if (this.props.resetpasswordloading) {
    return <Spinner size="large" />;
  }
  return (
    <Button onPress={this.onButtonPress.bind(this)}>
        Reset Password
    </Button>
  );
}
  render() {
    return (
      <View style={{ paddingTop: 80, backgroundColor: '#3c4558', flex: 1 }}>

      <Text style={styles.logoTextStyle}> Reset Password </Text>
        <CardSection>
          <Input
            placeholder="email@gmail.com"
            onChangeText={this.onForgotEmailChange.bind(this)}
            value={this.props.forgotemail}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder="New Password"
            onChangeText={this.onForgotPasswordChange.bind(this)}
            value={this.props.forgotPass}
            secureTextEntry
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder="New Password Confirm"
            onChangeText={this.onForgotPasswordConfirmChange.bind(this)}
            value={this.props.forgotPassConfirm}
            secureTextEntry
          />
        </CardSection>

          {this.renderButton()}


      </View>
    );
  }

}
const styles = {
  logoTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 70,
    paddingTop: 10,
    color: '#a9a9a9'
  },
  logoImageStyle: {
    alignSelf: 'center',
    height: 100
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: 'red',
    backgroundColor: '#3c4558'
  },
  textPoweredBy: {
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: 20,
    color: '#a9a9a9'
  }
};
const mapStateToProps = state => {
  return {
    forgotemail: state.auth.forgotemail,
    resetpasswordloading: state.auth.resetpasswordloading,
    forgotpassword: state.auth.forgotpassword,
    forgotconpassword: state.auth.forgotconpassword
  };
};
export default connect(mapStateToProps, {
  resetpasswordloading,
  forgotemailChanged,
  forgotPassChanged,
  forgotConPassChanged,
  forgotPassword
})(ForgotPassword);

// export default ForgotPassword;
