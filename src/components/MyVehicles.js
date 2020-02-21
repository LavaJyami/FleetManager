import React, { Component } from 'react';
import axios from 'axios';
import { FlatList, Text, View, Alert, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';
import { regdVehicleSearch } from '../actions';

class MyVehicles extends Component {

  constructor(props) {
      super(props);
      this.state = {
      isLoading: false,
    }
  }

      componentDidMount() {
        axios({
        method: 'post',
        url: 'https://fleetmanager.stems-solutions.com/ownervechsearch',
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        data: {
          owner: this.props.user.email
        }
      })
      .then(responseJson => this.setState({
          isLoading: false,
          dataSource: responseJson.data.regd_vehicles
        }))
      .catch((error) => console.log(error));
      }


  onButtonPress(image) {
    console.log('props sent from search results:');
    console.log(image);
    Actions.vehicleDetail1(image);
  }
  onEditButtonPress(item) {
    console.log(item);
  }
  onDeleteButtonPress(item) {
    console.log(item);
  }
  FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 10,
            width: "100%",
            backgroundColor: "#ffffff",
          }}
        />
      );
    }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ paddingTop: 60, paddingBottom: 50 }}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) =>
          <View style={{ shadowOffset:{ width: 10,  height: 10,}, shadowColor: 'black',shadowOpacity: 1.0,margin: 10, padding: 2, borderWidth: 1, borderColor: '#e6e6e6' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Image
                style={styles.imageStyle}
                source={{ uri: item.image }}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.HeadingTextStyle}>{item.manufacturer}</Text>
                <Text style={styles.TextStyle}>{`Manufacturer: ${item.manufacturer}`}</Text>
                <Text style={styles.TextStyle}>{`Model: ${item.model}`}</Text>
                <Text style={styles.TextStyle}>{`Seating Capacity: ${item.capacity}`}</Text>
              </View>
            </View>
              <View>
                    <View>
                      <Button onPress={this.onButtonPress.bind(this, item)}>
                          View Details
                      </Button>
                    </View>
                    <View >
                      <Button onPress={this.onEditButtonPress.bind(this, item)}>
                          Edit
                      </Button>
                    </View>
                    <View>
                      <Button onPress={this.onDeleteButtonPress.bind(this, item)}>
                          Delete
                      </Button>
                    </View>
              </View>

          </View>
          }
          keyExtractor={(item, id) => id.toString()}
        />
      </View>
    );
  }
}


const styles = {
  MainContainer: {
    flex: 1,
    paddingTop: 56,
  },
  SubContainer: {
    paddingTop: 10,
    paddingBottom: 25,
    marginTop: 10,
    flexDirection: 'row',
  },
  TextsContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  HeadingTextStyle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
    paddingLeft: 20
  },
  TextStyle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    paddingLeft: 20

  },
  imageStyle: {
    aspectRatio: 3 / 2,
    flex: 1,
    paddingTop: 5,
  }
};


const mapStateToProps = (state) => {
  const { redgsearchresult } = state.search;
  const { loggedin, user } = state.auth;
  return { loggedin, user, redgsearchresult };
};

export default connect(mapStateToProps, { regdVehicleSearch })(MyVehicles);
