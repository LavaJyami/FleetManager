import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';
import { View, Picker, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { requiredToChanged,
          requiredTimeChanged,
          search,
          vehicleTypeChanged,
          requiredFromChanged,
          durationOfHireChanged,
          inputTimeChanged,
          timeOut,
          collapsed } from '../actions';
import SearchResults from './SearchResults';
import { CardSection, Spinner, Button } from './common';

const today = new Date();

class SearchForm extends Component {

constructor(props){
  super(props);
  this.state = {
  collapsedstate: true,
  timePassed: false,
  timerTriggered: false
}
}
componentDidMount() {
  this.props.collapsed();
}
onVechTypeChange(text) {
  this.props.vehicleTypeChanged(text);
}
onReqFromChange(text) {
  this.props.requiredFromChanged(text);
}
onReqToChange(text) {
  this.props.requiredToChanged(text);
}
onDurationChange(text) {
  this.props.durationOfHireChanged(text);
}

  onTimeChange() {
    const value = this.props.reqTime;
    this.props.inputTimeChanged({ value });
  }
  onButtonPress() {
    const token = this.props.token;
    const vehicleType = this.props.vehicletype;
    const reqTodate = this.props.reqTodate;
    const reqfromdate = this.props.reqfromdate;
    this.props.search({ token, vehicleType, reqTodate, reqfromdate });
  }
toggleExpanded() {
  this.props.collapsed();
}
renderSpinner() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }
}
renderButton() {
  setTimeout(() => { this.setState({ timePassed: true, timerTriggered: true }); }, 30000);
  if (this.props.loading & !this.state.timePassed) {
    return <Spinner size="large" />;
  }
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
            Search Vehicles
        </Button>
      );
  }
  render() {
      return (
        <View style={{ paddingTop: 60, backgroundColor: '#ffffff', flex: 1 }}>
        <TouchableOpacity onPress={this.toggleExpanded.bind(this)} >
        <View>
          <CardSection style={styles.inputStyle}>
              <Text style={{ paddingTop: 8 }}> Hire From: </Text>
              <DatePicker
                style={{ width: 220 }}
                date={this.props.reqfromdate}
                mode="datetime"
                placeholder="REQUIRED FROM"
                format="YYYY-MM-DD HH:mm"
                is24Hour
                minDate={today}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateInput: {
                marginLeft: 25,
                borderColor: '#ffffff'
                }
                }}
                onDateChange={(datetime) => this.props.requiredFromChanged({
                prop: 'reqfromdate', value: datetime })}
              />
            </CardSection>
        </View>
      </TouchableOpacity>

        <Collapsible collapsed={this.props.collapse} align="center">
          <View>
              <CardSection style={styles.inputStyle}>
              <Text style={{ paddingTop: 8 }}> Hire To    : </Text>
                <DatePicker
                  style={{ width: 220 }}
                  date={this.props.reqTodate}
                  mode="datetime"
                  placeholder="REQUIRED TO"
                  format="YYYY-MM-DD HH:mm"
                  is24Hour
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                  dateInput: {
                  marginLeft: 25,
                  borderColor: '#ffffff'
                  }
                  // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(datetime) => this.props.requiredToChanged({
                  prop: 'reqTodate', value: datetime })}
                />
              </CardSection>
              <CardSection style={styles.inputStyle}>
              <Text style={{ paddingTop: 12 }}> Type        : </Text>

                <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.vehicletype}
                onValueChange={text => this.props.vehicleTypeChanged({ prop: 'vehicletype', value: text })}
                >

                <Picker.Item label="Select" value="" />
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Jeep" value="Jeep" />
                <Picker.Item label="Van" value="Van" />
                <Picker.Item label="Bus" value="Bus" />
                </Picker>
              </CardSection>
            {this.renderButton()}

          </View>
        </Collapsible>
            <View style={{ flex: 1 }}>
              <SearchResults data={this.props.searchresult} />
            </View>
        </View>

      );
    }
}
const styles = {
  logoTextStyle: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingTop: 10,
    fontSize: 22,
    color: '#f5f5f5'
  },
  inputStyle: {
    borderColor: '#e5e5e5',
    borderWidth: 1
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
    paddingTop: 20,
    color: '#a9a9a9'
  },
  inputTextStyle: {
    paddingBottom: 10
  }
};

const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { reqTodate, vehicletype, reqfromdate, loading, collapse, searchresult } = state.search;
  return { token, loading, reqTodate, vehicletype, reqfromdate, collapse, searchresult };
};

export default connect(mapStateToProps,
  { requiredTimeChanged,
    requiredToChanged,
    vehicleTypeChanged,
    requiredFromChanged,
    durationOfHireChanged,
    search,
    inputTimeChanged,
    timeOut,
    collapsed })(SearchForm);
