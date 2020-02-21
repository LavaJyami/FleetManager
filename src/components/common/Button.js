import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
       <Text style={textStyle}>
         { children }
       </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#ddd',
    backgroundColor: '#39e3a3'
  },
  buttonStyle: {
    backgroundColor: '#39e3a3',
    borderColor: 'white',
    overflow: 'hidden',
    marginRight: 45,
    marginLeft: 45,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 10


}

};

export { Button };
