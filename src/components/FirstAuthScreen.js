import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';

class FirstAuthScreen extends Component {
  componentWillMount() {
    if (this.props.loggedin) {
        Actions.main();
    }
  }
onSignupButtonPress() {
  Actions.signup();
}
onLoginButtonPress() {
  Actions.login();
}
renderSignupButton() {
  return (
    <Button onPress={this.onSignupButtonPress.bind(this)}>
        Signup
    </Button>
  );
}
renderLoginButton() {
  return (
    <Button onPress={this.onLoginButtonPress.bind(this)}>
        Login
    </Button>
  );
}

  render() {
    return (
      <View style={{ paddingTop: 80, backgroundColor: '#3c4558', flex: 1 }}>
      <Text style={styles.logoTextStyle}> FLEET MANAGER </Text>
      <Image
      style={styles.logoImageStyle}
      source={require('../assets/FleetManLogo.png')}
      />
      <Text style={styles.topictextstyle}> Easy way to book chauffer driven vehicles!! </Text>
      {this.renderSignupButton()}
      {this.renderLoginButton()}

      </View>
    );
  }

}

const styles = {
  topictextstyle: {
    fontSize: 25,
    color: '#f5f5f5',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center'
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
    loggedin: state.auth.loggedin
  };
};
export default connect(mapStateToProps)(FirstAuthScreen);
