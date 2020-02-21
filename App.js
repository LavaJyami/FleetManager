import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';
import axios from 'axios';

class MainProject extends Component {
  componentWillMount() {
    axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/oauth/token',
    data: {
      username: 'ankur20@gmail.com',
      password: 'kalomakuro',
      grant_type: 'password',
      client_id: '4',
      client_secret: 'b3urksLTwQVKxJXkRjOPgMkRNHq8YF6USILsrfzF',
      scope: '*'
    }
  }).then(response => {
      console.log('Our token');
      console.log(response.data.access_token);
   }).catch(response => console.log(response));
  }

UserRegistrationFunction() {
console.log('promise');
}

render() {
    return (

<View style={styles.MainContainer}>

        <Text
        style={{ fontSize: 20, color: '#000', textAlign: 'center', marginBottom: 15 }}
        >User Registration Form</Text>

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Name"

          onChangeText={UserName => this.setState({ UserName })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"

          onChangeText={UserEmail => this.setState({ UserEmail })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"

          onChangeText={UserPassword => this.setState({ UserPassword })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}

          secureTextEntry
        />

        <Button
        title="Click Here To Register"
        onPress={this.UserRegistrationFunction.bind(this)}
        color="#2196F3"
        />


</View>

    );
  }
}

const styles = StyleSheet.create({

MainContainer: {

justifyContent: 'center',
flex: 1,
margin: 10
},

TextInputStyleClass: {

textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',

 // Set border Radius.
 borderRadius: 5,

// Set border Radius.
 //borderRadius: 10 ,
}

});

export default MainProject;
