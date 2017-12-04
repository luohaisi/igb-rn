import React, { Component } from 'react';

var Conf = require('../Conf/Conf.js')

updatePwd = (params) => {

    return fetch( Conf.HOST, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .then((responseJson) => {

        return responseJson;
    })
    .catch((error) => {
      console.error('fetchError:updatePwd', error);
    });

}

module.exports = {
    updatePwd: updatePwd
  }