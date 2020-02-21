import React, { Component } from 'react';
import { View, Text, Image, Alert, Picker, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, CardSection, Input, Spinner } from './common';
import { imagePicked,
    addvehicleTypeChanged,
    manufacturerChanged,
    capacityChanged,
    submitAddVehicle,
    regChanged,
    regdVehicleSearch
 } from '../actions';

class AddVehicle extends Component {
  onPickSingleWithCamera() {
   ImagePicker.openCamera({
     cropping: true,
     width: 400,
     height: 300,
     includeExif: true,
   }).then(image => {
     this.props.imagePicked(image.path);
     this.props.picked_image_uri = image.path;
   }).catch(e => console.log(e));
  }

  onPickSingle() {
    ImagePicker.openPicker({
     width: 300,
     height: 300,
     cropping: false,
     cropperCircleOverlay: false,
     compressImageMaxWidth: 640,
     compressImageMaxHeight: 480,
     compressImageQuality: 0.5,
     compressVideoPreset: 'MediumQuality',
     includeExif: true,
   }).then(image => {
     console.log('received image', image);
     this.props.imagePicked(image.path);
     this.props.picked_image_uri = image.path;
   }).catch(e => {
     console.log(e);
     Alert.alert(e.message ? e.message : e);
   });
  }
  onSubmit() {
    const model = this.props.model;
    const token = this.props.token;
    const email = this.props.user.email;
    const vehicletype = this.props.vehicletype;
    const manufacturer = this.props.manufacturer;
    const capacity = this.props.capacity;
    const reg = this.props.reg;
    const uri = this.props.picked_image_uri;
    this.props.submitAddVehicle({ model,
                                  token,
                                  email,
                                  vehicletype,
                                  manufacturer,
                                  capacity,
                                  reg,
                                  uri });
  }
    manufacturerChanged(text) {
      this.props.manufacturerChanged(text);
    }
    regChanged(text) {
      this.props.regChanged(text);
    }
    modelChanged(text) {
      this.props.modelChanged(text);
    }
    manudateChanged(text) {
      this.props.manudateChanged(text);
    }


    renderImageButton() {
        return (
          <View>
          <Button onPress={this.onPickSingleWithCamera.bind(this)}>
            Take Picture
          </Button>

          <Button onPress={this.onPickSingle.bind(this)}>
            Select From Phone
          </Button>
          </View>
        );
      }
    renderImage() {
    if (this.props.picked_image_uri) {
      return (

        <Image
              style={{ width: 200, height: 160, alignSelf: 'center' }}
              source={{ uri: this.props.picked_image_uri }}
        />
      );
    }
    }

    renderSubmitButton() {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }
      return (
        <Button style={{ paddingBottom: 30 }} onPress={this.onSubmit.bind(this)}>
          Submit
        </Button>
      );
    }

  render() {
    const { height, width } = Dimensions.get('window');
      return (
          <View style={{ flex: 1, paddingTop: 53, paddingBottom: 50, backgroundColor: '#3c4558' }}>
            <ScrollView style={{ backgroundColor: '#3c4558', height }}>
            <CardSection>
                <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.vehicletype}
                onValueChange={
                text => this.props.addvehicleTypeChanged({
                prop: 'vehicletype', value: text })}
                >
                <Picker.Item label="Vehicle Type" value="" />
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Jeep" value="Jeep" />
                <Picker.Item label="Van" value="Van" />
                <Picker.Item label="Bus" value="Bus" />
              </Picker>
            </CardSection>
            <CardSection>
            <Input
              style={styles.itemStyle}
              placeholder="Skoda Rapid 2015"
              onChangeText={this.manufacturerChanged.bind(this)}
              value={this.props.manufacturer}
            />
            </CardSection>
            <CardSection>
            <Input
              style={styles.itemStyle}
              placeholder="B AA 3465"
              onChangeText={this.regChanged.bind(this)}
              value={this.props.reg}
            />
            </CardSection>
            <CardSection>
                <Picker
                style={{ flex: 1, color: '#aaa' }}
                selectedValue={this.props.capacity}
                onValueChange={
                text => this.props.capacityChanged({
                prop: 'capacity', value: text })}
                >
                <Picker.Item label="Passenger Capacity" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="32" value="32" />
              </Picker>
            </CardSection>

        <Text style={styles.logoTextStyle}> Add Vehicle Image </Text>
          {this.renderImage()}
          {this.renderImageButton()}
          {this.renderSubmitButton()}
        </ScrollView>
        </View>

      );
    }
}
const styles = {
  logoTextStyle: {
  alignSelf: 'center',
  marginBottom: 5,
  paddingTop: 20,
  fontSize: 16,
  color: '#f5f5f5'
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
  },
  itemStyle: {
    textAlign: 'left',
    color: '#aaa'
  }
};

const mapStateToProps = (state) => {
  const { token, user } = state.auth;
  const { picked_image_uri,
    vehicletype,
    manufacturer,
    capacity,
    reg,
    loading
  } = state.addvehicle;
  return { picked_image_uri,
    vehicletype,
    manufacturer,
    capacity,
    token,
    user,
    reg,
    loading
   };
};
export default connect(mapStateToProps,
  { imagePicked,
    addvehicleTypeChanged,
    manufacturerChanged,
    capacityChanged,
    submitAddVehicle,
    regChanged,
    regdVehicleSearch
   })(AddVehicle);
