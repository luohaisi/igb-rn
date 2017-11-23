import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

var mock = require('./Mock.js')

overview = () => {

    return fetch('https://facebook.github.io/react-native/movies.json',{
        method: 'GET'

    })
    .then((response) => response.json())
    .then((responseJson) => {

      return mock.overview;
    })
    .catch((error) => {
      console.error('fetchError', error);
    });

}

module.exports = {
    overview: overview
  }

// skip this line if using Create React Native App
// AppRegistry.registerComponent('IGreenBuy', () => LoginService);