import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import { loginFacebookUser, emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

onEmailChange(text) {
  this.props.emailChanged(text);
}
onPasswordChange(text) {
  this.props.passwordChanged(text);
}
onButtonPress() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}
onSignupButtonPress() {
  Actions.signup();
}
forgotpwd() {
 Linking.openURL('https://fleetmanager.stems-solutions.com/password/reset');
}
renderError() {
  if (this.props.error) {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}
renderButton() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }
  return (
    <TouchableOpacity style={styles.loginButton} onPress={this.onButtonPress.bind(this)}>
       <Text style={{ color: '#ffffff', alignSelf: 'center', paddingTop: 10 }}>
         Login with Email
       </Text>
    </TouchableOpacity>
  );
}

renderSignupButton() {
  return (
    <Button onPress={this.onSignupButtonPress.bind(this)}>
        Signup
    </Button>
  );
}
  render() {
    return (
      <View style={{ paddingTop: 80, backgroundColor: '#3c4558', flex: 1 }}>
      <Image
      style={styles.logoImageStyle}
      source={require('../assets/FleetManLogo.png')}
      />
      <Text style={styles.logoTextStyle}> FLEET MANAGER </Text>

        <CardSection>
          <Input
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
        <Input
        secureTextEntry
        placeholder="Password"
        onChangeText={this.onPasswordChange.bind(this)}
        value={this.props.password}
        style={styles.inputTextStyle}
        />
        </CardSection>
          {this.renderError()}
          <TouchableOpacity onPress={this.forgotpwd}>
          <Text style={styles.logoTextStyle}> Forgot Password? </Text>
          </TouchableOpacity>

        <View style={styles.buttonsContainer}>
        {this.renderButton()}
        <FBLogin
          style={styles.fbButtonStyle}
          permissions={['email', 'user_friends']}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={userData => this.props.loginFacebookUser(userData)}
          onLoginNotFound={() => console.log('Login Not found')}
        />
        </View>

      </View>
    );
  }

}

const styles = {
  fbButtonStyle: {
    paddingBottom: 35
  },
  loginButton: {
    marginRight: 4,
    width: 140,
    height: 45,
    backgroundColor: '#ED3034',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 15
  },

  logoTextStyle: {
    alignSelf: 'center',
    marginBottom: 10,
    paddingTop: 10,
    color: '#f5f5f5'
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
    color: '#a9a9a9'
  },
  inputTextStyle: {
    paddingBottom: 10,
  }
};
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    confirmpassword: state.auth.confirmpassword,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedin: state.auth.loggedin
  };
};
export default connect(mapStateToProps, {
  loginFacebookUser, emailChanged, passwordChanged, loginUser
})(LoginForm);
