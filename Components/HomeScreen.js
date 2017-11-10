import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu.</Text>
        </View>
      );
    }
  }

  // skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => HomeScreen);