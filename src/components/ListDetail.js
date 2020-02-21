import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Button from './common/Button';

const ListDetail = ({ vehicle }) => {

  const { model, color, manufacturer, fuel_type } = vehicle;
  const {
    headerContentStyle,
    thumbnailStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    } = styles;

  return (
    <Card>
      <CardSection>
      <View style={headerContentStyle}>
      <Text style={headerTextStyle}>{manufacturer}</Text>
      <Text>{model}</Text>
      <Text>{color}</Text>
      </View>
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          View Details
        </Button>
      </CardSection>
    </Card>
  );
  };

const styles = {
  headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  headerTextStyle: {
      fontSize: 18
  },
  thumbnailStyle: {
      height: 50,
      width: 50
  },
  thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10

  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default ListDetail;
