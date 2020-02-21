import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner } from './common';
import { getBookings } from '../actions';

class VehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      timerTriggered: false
    }
  }
  componentDidMount() {
    const id = this.props.vehicleid;
    this.setState({
      isLoading: false,
      image: id
    });
  }
  onButtonPress() {
    console.log('props sent');
    console.log(this.props.id);
    this.props.getBookings(this.props.id);
  }
  renderButton() {
    setTimeout(() => { this.setState({ timePassed: true, timerTriggered: true }); }, 15000);
    if (this.props.loading & !this.state.timePassed) {
      return <Spinner size="large" />;
    }
        return (
          <Button onPress={this.onButtonPress.bind(this)}>
            Book Now
          </Button>
        );
    }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 60 }}>
      <View style={{ flex: 0.7 }}>
        <Image
          style={styles.imageStyle}
          source={{ uri: this.props.image }}
        />
        </View>
        <Text style={styles.titleStyle}>{this.props.manufacturer}</Text>
        <Text style={styles.textStyle}>Capacity     : {this.props.capacity}</Text>
        <Text style={styles.textStyle}>Reg number : {this.props.reg_number}</Text>
        {this.renderButton()}
      </View>

    );
  }
}


const styles = {
  imageStyle: {
    height: undefined,
    width: undefined,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 7
  },
  titleStyle: {
    fontSize: 18,
    color: '#ED3034',
    paddingLeft: 10,
    paddingTop: 20,
  },
  textStyle: {
    fontSize: 14,
    color: '#111111',
    paddingLeft: 10,
    paddingTop: 10,
  }
};

const mapStateToProps = (state) => {
  const { searchresult } = state.search;
  const { loading } = state.booking;
  return { searchresult, loading };
};

export default connect(mapStateToProps, { getBookings })(VehicleDetail);
