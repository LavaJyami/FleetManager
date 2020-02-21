import React from 'react';
import { View, TextInput } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
  marginLeft: 0,
  marginRight: 35,
  marginTop: 10,
  textAlign: 'left',
  paddingRight: 5,
  paddingTop: 3,
  paddingLeft: 5,
  fontSize: 16,
  flex: 1,
},

containerStyle: {
  height: 40,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
}


};
export { Input };
