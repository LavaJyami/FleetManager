import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Alert
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Spinner, Button } from './common';
import {
  bookIt,
  markingChanged,
  datesChanged,
  updateCalfrmDb,
  reqFromDateChanged,
  saveClickedStartDate,
  toggleCounter,
  reqfromchanged,
  reqtochanged
} from '../actions';

const today = new Date();
class BookingCalendar extends Component {
  constructor(props) {
    super(props);
    this.selectDate.bind(this);
  }
componentDidMount() {
    this.props.toggleCounter('1');
    this.props.reqfromchanged(this.props.reqfromdate);
    this.props.reqtochanged(this.props.reqTodate);
    const dates = this.props.dates;
    const newDates = { ...dates };
    _.forEach(_.keys(newDates), (item) => delete newDates[item]);
    this.props.datesChanged(newDates);
    const startDate = moment(this.props.reqfromdate, 'YYYY-MM-DD HH:mm');
    const endDate = moment(this.props.reqTodate, 'YYYY-MM-DD HH:mm');
    const duration = moment.duration(endDate.diff(startDate));
    const days = parseInt(duration.asHours(), 10) / 24;
    if (days > 0) {
      if (days < 1) {
        const newDate = this.addday(startDate, 0);
        newDates[newDate] =
          {
            endingDay: false,
            selected: true,
            marked: true,
            selectedColor: 'green',
            color: 'green',
          };
        } else {
        for (let i = 0; i <= days; i++) {
          const newDate = this.addday(startDate, i);
          newDates[newDate] =
            {
              endingDay: false,
              selected: true,
              marked: true,
              selectedColor: 'green',
              color: 'green'
            };
          }
        }
  }
  const futurebookings = this.props.bookingDates.data.futurebookings;
  if (futurebookings) {
    for (let i = 0; i < futurebookings.length; i++) {
      const bookedstartDate = moment(futurebookings[i].datefrom, 'YYYY-MM-DD');
      const bookedendDate = moment(futurebookings[i].dateto, 'YYYY-MM-DD');
      const bookedduration = moment.duration(bookedendDate.diff(bookedstartDate));
      const bookeddays = parseInt(bookedduration.asHours(), 10) / 24;
      for (let j = 0; j <= bookeddays; j++) {
      const bookednewDate = this.addday(bookedstartDate, j);
        newDates[bookednewDate] =
          {
            endingDay: false,
            selected: true,
            marked: true,
            selectedColor: '#dddddd',
            color: '#dddddd'
          };
        }//end of second for loop
      }//end of first for loop
  }
  this.props.datesChanged(newDates);
  this.props.markingChanged('period');
}

onButtonPress() {
const MomentStartDate = moment(this.props.reqFromDate, 'YYYY-MM-DD HH:mm');
const MomentEndDate = moment(this.props.reqToDate, 'YYYY-MM-DD HH:mm');
const startDate = MomentStartDate.format('YYYY-MM-DD').toString();
const endDate = MomentEndDate.format('YYYY-MM-DD').toString();
const startTime = MomentStartDate.format('HH:mm').toString();
const endTime = MomentEndDate.format('HH:mm').toString();
const vehicleId = this.props.vehicleid;
const userId = this.props.user.id;
  if (!this.props.loggedin) {
      Alert.alert(
      'You are not logged in!',
      'Please login to proceed',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Login', onPress: () => Actions.main1() },
      ],
      { cancelable: false }
    );
  } else {
    this.props.bookIt(startDate, endDate, startTime, endTime, vehicleId, userId);
}
}

selectDate(date, dates) {
const selectedDate = date.dateString;
if (this.props.counter === '1') {
  const newDates = { ...dates };
  _.forEach(_.keys(newDates), (item) => delete newDates[item]);
  newDates[selectedDate] =
    { startingDay: true,
      selected: true,
      marked: true,
      selectedColor: 'blue',
      color: 'green'
    };
  this.props.saveClickedStartDate(date);
  this.props.reqfromchanged(date.dateString);
  this.props.datesChanged(newDates);
  this.props.toggleCounter('2');
} else {
  const startDate = moment(this.props.clickedstartdate.dateString);
  const endDate = moment(date.dateString);
  this.props.reqtochanged(date.dateString);
  const duration = endDate.diff(startDate, 'days');
  const days = parseInt(duration, 10);
  const newDates = { ...dates };
      for (let i = 0; i <= days; i++) {
        const newDate = this.addday(startDate, i);
        newDates[newDate] =
          {
            endingDay: false,
            selected: true,
            marked: true,
            selectedColor: 'yellow',
            color: 'green'
          };
        }

this.props.datesChanged(newDates);
this.props.toggleCounter('1');
}
}

addday(date, increment) {
const newDate = moment(date, 'YYYY-MM-DD').add(increment, 'days');
const day = newDate.format('DD');
const month = newDate.format('MM');
const year = newDate.format('YYYY');
return (year + '-' + month + '-' + day);
}

renderButton() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
            Confirm
        </Button>
      );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Select dates to book the vehicle</Text>
        <View>
            <Calendar
              current={moment(this.props.reqfromdate, 'YYYY-MM-DD').toString()}
              onDayPress={day => this.selectDate(day, this.props.dates)}
              markedDates={this.props.dates}
              markingType={this.props.markingType}
              minDate={today}
              hideExtraDays
            />
            <CardSection>
              <Text style={styles.indicatorWords}>
                From: {moment(this.props.reqFromDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm').toString()} -
                To: {moment(this.props.reqToDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm').toString()}
              </Text>
            </CardSection>
            {this.renderButton()}
          </View>
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
    backgroundColor: 'white'
  },
  indicatorWords: {
    fontSize: 12,
    color: 'red'
  }
});


const mapStateToProps = (state) => {
  const { reqTodate, reqfromdate } = state.search;
  const { dates, markingType, loading, reqFromDate, reqToDate, counter, clickedstartdate } = state.booking;
  const { loggedin, user } = state.auth;
  return {
    reqTodate,
    reqfromdate,
    dates,
    markingType,
    loggedin,
    user,
    loading,
    reqFromDate,
    counter,
    clickedstartdate,
    reqToDate };
};

export default connect(mapStateToProps, {
  markingChanged,
  datesChanged,
  updateCalfrmDb,
  bookIt,
  reqFromDateChanged,
  saveClickedStartDate,
  toggleCounter,
  reqfromchanged,
  reqtochanged
})(BookingCalendar);
