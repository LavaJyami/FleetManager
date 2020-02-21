import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';


class ListItem extends Component {
// onRowPress() {
//   Actions.employeeEdit({ employee: this.props.employee });
// }
  render() {
    const { color } = this.props.vehicles;
    return (
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {color}
            </Text>
          </CardSection>
        </View>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};
export default ListItem;
