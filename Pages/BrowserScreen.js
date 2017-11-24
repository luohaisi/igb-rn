import React, { Component } from 'react';
import { AppRegistry, View, WebView, Modal, Text, Image, TouchableHighlight } from 'react-native';

import { Toast } from 'antd-mobile';

export default class BrowserScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  componentDidMount(){
    // Toast.loading('Loading...', 10);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  static navigationOptions = {
    header: null,
  };

  render() {

    const { state } = this.props.navigation;

    const { loginName, password, token } = state.params;

    console.info('state', loginName + password + token )

    let HOST = 'http://101.132.47.27:3000'

    let url = HOST + '/home?loginName='+loginName+'&password='+password+'&token='+token

    return (
      <View style={{flex:1}}>
          <WebView style={{flex:1}} source={{uri: url}}
                  onLoad={() => {
                      const t = setInterval(() => {
                        this.setModalVisible(!this.state.modalVisible)
                        clearInterval(t)
                      }, 1000);

                  }}/>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
            >
            <View style={{flex:1, backgroundColor: 'rgba(19,160,232,0.5)'}}>
              <View style={{flex:1,alignItems:'center',justifyContent:'space-around'}}>
                <Image style={{width:100,height:100}} source={require('../Images/loadingIcon.png')} />
              </View>
              <View style={{flex:1,alignItems:'center',justifyContent:'flex-end',marginBottom:20}}>
                <Image style={{width:32,height:32}} source={require('../Images/loading.png')} />
                <Text style={{color:'#F2F2F2'}}>Loading...</Text>
              </View>
            </View>
          </Modal>
      </View>
    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => BrowserScreen);