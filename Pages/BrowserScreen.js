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

var WEBVIEW_REF = 'webview';

export default class BrowserScreen extends Component {

  static navigationOptions = {
    header: null,
  }; 

  constructor(props) {
    super(props);
    this.state = {
      title:'',
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
        return false;
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
      title: navState.title
    });
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };


  render() {

    const { navigate } = this.props.navigation;

    const { state } = this.props.navigation;
    const { url } = state.params;

    let jsCode = `
        document.querySelector('body').style.backgroundColor = 'red';
    `;

    let jsdCode = `
        localStorage.set('inject', 'getIn');
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
                <Text style={{color : '#F2F2F2'}}>
                  {'<'}
                </Text>
              </TouchableOpacity>

            </View>
            <View style={{flex: 5, alignItems:'center', justifyContent:'center'}} >
              <Text style={{color : '#F2F2F2'}}>{this.state.title}</Text>
            </View>
            <View style={{flex: 1}} >
              <TouchableOpacity
                onPress={this.goForward}
                style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                <Text style={{color : '#F2F2F2'}}>
                  {'>'}
                </Text>
              </TouchableOpacity>
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
                  onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                  injectJavaScript={(e)=>console.info('injectJavaScript', e)}
                  injectedJavaScript={jsdCode}
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
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => BrowserScreen);