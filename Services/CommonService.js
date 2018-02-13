/**
 * 20180206
 * @author luohaisi
 */

var Conf = require('../Conf/Host.js')

const getRemoteData = (params) => {
  // console.log('getRemoteData', params)
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
      // console.log('responseJson',responseJson.result[0].materialStatData)
      return responseJson;
    })
    .catch((error) => {
      console.error('fetchError', error);
    });
}




 export {
    getRemoteData
 }