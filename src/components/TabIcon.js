import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabIcon extends Component {
  render() {
    const color = this.props.selected ? 'red' : '#111111';
    return (
      <View style={{ backgroundColor: '#f5f5f5', width: '100%', height: '100%', justifyContent: 'center' }}>
        <Icon style={{ color, justifyContent: 'center', alignSelf: 'center' }} name={this.props.iconName || 'circle'} size={18} />
      </View>
    );
  }
}


export default TabIcon;
