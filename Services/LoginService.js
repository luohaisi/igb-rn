import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

var Conf = require('../Conf/Conf.js')

login = (loginName, password) => {

    return fetch( Conf.HOST, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginName: loginName,
          password: password,
          requestType:'USER_LOGIN'
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error('fetchError', error);
    });

}

logout = (loginName, password, token) => {
  
    return fetch( Conf.HOST, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginName: loginName,
          password: password,
          token:token,
          requestType:'USER_LOGOUT'
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error('fetchError', error);
    });

}

module.exports = {
    login: login,
    logout: logout
  }

// skip this line if using Create React Native App
// AppRegistry.registerComponent('IGreenBuy', () => LoginService);