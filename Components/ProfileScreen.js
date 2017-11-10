import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

export default class ProfileScreen extends Component {
    static navigationOptions = {
      title: 'ProfileScreen',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Button
          title="Go HomeScreen"
          onPress={() =>
            navigate('Home', { name: 'Jane2' })
          }
        />
      );
    }
  }

  // skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => ProfileScreen);