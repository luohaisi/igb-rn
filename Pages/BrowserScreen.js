import React, { Component } from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Platform,
  BackHandler,
  WebView,
  Modal, 
  View,  
  Text, 
  Image, 
  TouchableHighlight, 
  TouchableOpacity 
} from 'react-native';

import { Toast } from 'antd-mobile';

var WEBVIEW_REF = 'webview';

let count = 0

export default class BrowserScreen extends Component {

  static navigationOptions = {
    header: null,
  }; 

  constructor(props) {
    super(props);
    this.state = {
      title:'阳光采购',
      modalVisible: true,
      backButtonEnabled: false,
      forwardButtonEnabled: false,
    };
  }

  componentDidMount(){

  }

  componentWillMount() {

    that = this
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', function() {
        if (that.state.backButtonEnabled) {
          that.goBack();
          return true;
        }
        // console.info('routeName', that.props.navigation.state.routeName)
        // 第一次按后退提示再按退出
        count++
        if(count > 1 && that.props.navigation.state.routeName == 'Browser')
          BackHandler.exitApp()
        Toast.info('再按一次返回键退出',1);

        // 3秒钟后设置count=0 重新计算
        setTimeout(()=>count = 0,3000)

        return true;
       });

    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    return false;
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      // title: navState.title
    });
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  }

  renderError(errorDomain, errorCode, errorDesc) {
    return (
      <View style={styles.error}>
        <TouchableOpacity style={styles.button} onPress={this.reload}>
          <Text style={{color:'white'}}>重新加载</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onMessage = (event)=>{
    let message = JSON.parse(event.nativeEvent.data)
    if(message.title){
      this.setState({title: message.title})
    }
    if(message.backButtonEnabled){
      this.setState({backButtonEnabled: message.backButtonEnabled})
    }
    console.log(event.nativeEvent.data)
  }

  render() {

    const { navigate } = this.props.navigation;

    const { state } = this.props.navigation;
    const { url } = state.params;

    let jsCode = `
        document.querySelector('am-navbar-title').style.backgroundColor = 'red';
    `;

    let jsdCode = `
      window.postMessage(data, JSON.stringify({
        action: 'DATE_PICKER',
        payload: payload
      }));
    `;

    return (
      
      <View style={{flex:1}}>
          
        <View style={[styles.addressBarRow]}>

          <View style={{flex: 1, flexDirection: 'row',alignItems:'center'}}>
            <View style={{flex: 1}}>

              <TouchableOpacity style={this.state.backButtonEnabled ? styles.disabledButton : ''} onPress={() => navigate('Setting')} >
                <Image source={require('../Images/Icons/settings_light.png')} style={{width:30,height:30}} />
              </TouchableOpacity>
            
              <TouchableOpacity
                onPress={this.goBack}
                style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                <Image source={require('../Images/Icons/back.png')} style={{width:30,height:30}} />
              </TouchableOpacity>

            </View>
            <View style={{flex: 5, alignItems:'center', justifyContent:'center'}} >
              <TouchableOpacity onPress={this.reload}>
                <Text style={{color : '#F2F2F2'}}>{this.state.title}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,alignItems:'flex-end'}} >

            </View>

          </View>

        </View>

          <WebView style={{flex:1}} source={{uri: url}}
                  ref={WEBVIEW_REF}
                  onLoadStart={() => {
                    this.setState({modalVisible: true})
                  }}
                  onLoadEnd={()=>{
                    this.setState({modalVisible: false})
                  }}
                  onMessage={this._onMessage}
                  onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                  renderError={this.renderError}
                  // injectJavaScript={}
                  // injectedJavaScript={jsCode}
          />




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

const styles = StyleSheet.create({
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor:'#117BE9'
  },
  disabledButton: {
    display:'none'
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  error: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FF0000',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 3
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => BrowserScreen);