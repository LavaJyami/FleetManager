import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const today = new Date();
const today1 = today.toISOString().split('T')[0];

class TimeSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

componentDidMount() {
      Alert.alert(today1);
}
onDayPress(day) {
  this.setState({
    selected: day.dateString
  });
}
  render() {
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.text}>Calendar with multi-dot marking</Text>

        <Calendar
          style={styles.calendar}
          current={today}
          minDate={today}
          markingType={'multi-dot'}
          markedDates={{
          [today1]: {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'white'}, {key: 'massage', color: 'red', selectedDotColor: 'white'}], selected: true},
            '2018-07-16': {dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'red'}, {key: 'massage', color: 'red', selectedDotColor: 'blue'}], disabled: true}
          }}
          hideArrows={false}

        />

      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});

export default TimeSlots;
