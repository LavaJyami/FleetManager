import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { signupemailChanged,
          signuppasswordChanged,
          signuppasswordConfirmChanged,
          signupnameChanged,
          signupphoneChanged,
          signupUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';

class SignUpForm extends Component {
onSignupEmailChange(text) {
  this.props.signupemailChanged(text);
}
onPasswordChange(text) {
  this.props.signuppasswordChanged(text);
}
onPasswordConfirmChange(text) {
  this.props.signuppasswordConfirmChanged(text);
}
onNameChange(text) {
  this.props.signupnameChanged(text);
}
onPhoneChange(text) {
  this.props.signupphoneChanged(text);
}
onButtonPress() {
  const { email, password } = this.props;
  this.props.signupUser({ email, password });
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
    <Button onPress={this.onButtonPress.bind(this)}>
      Sign Up
    </Button>
  );
}

  render() {
    return (
      <View style={{ paddingTop: 80, backgroundColor: '#3c4558', flex: 1 }}>

      <Text style={styles.topictextstyle}> SIGN UP </Text>

      <CardSection>
        <Input
          placeholder="Full Name"
          onChangeText={this.onNameChange.bind(this)}
          value={this.props.name}
        />
      </CardSection>
        <CardSection>
          <Input
            placeholder="email@gmail.com"
            onChangeText={this.onSignupEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Phone"
            onChangeText={this.onPhoneChange.bind(this)}
            value={this.props.phone}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
        <Input
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={this.onPasswordConfirmChange.bind(this)}
            value={this.props.confirmpassword}
        />
        </CardSection>
          {this.renderError()}

          {this.renderButton()}

      </View>
    );
  }

}

const styles = {
  topictextstyle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#f5f5f5'
  },
  fbButtonStyle: {
    paddingBottom: 30,
    flex: 0.5,
    alignSelf: 'center',
    borderRadius: 5
  },
  logoTextStyle: {
    alignSelf: 'center',
    marginBottom: 20,
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
    email: state.signup.email,
    password: state.signup.password,
    confirmpassword: state.signup.confirmpassword,
    name: state.signup.name,
    phone: state.signup.phone,
    error: state.signup.error,
    loading: state.signup.loading
  };
};
export default connect(mapStateToProps, {
signupemailChanged,
signuppasswordChanged,
signuppasswordConfirmChanged,
signupUser,
signupnameChanged,
signupphoneChanged,
})(SignUpForm);
