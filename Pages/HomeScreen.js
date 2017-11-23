import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, WebView, AsyncStorage } from 'react-native';
// Third part
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from '../Components/CoreLib/DefaultTabBar';
// Custom
import IndexGrid from '../Components/Common/IndexGrid';
import Preview from '../Components/Common/Preview';
// import SuperChart from '../Components/Common/SuperChart';

// Services
var HomeService = require('../Services/HomeService.js')

var ls = require('react-native-local-storage');

export default class HomeScreen extends Component {


  componentDidMount(){
    // 从接口请求默认数据
    HomeService.overview().then(response=>{
      console.log('overview', response)
    });
  }

  constructor(props) {
    super(props);
    this.state = {userInfo: {}};

    ls.get('userInfo').then((data) => {
      console.log('get', data)
      this.setState(() => {
        return { userInfo: data };
      });
    });

  }
    
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    // const isInfo = state.params.mode === 'info';
    return {
      headerTitle: navigation.state.params.entName,
      headerTitleStyle:{
        color : '#F2F2F2',
        // alignSelf:'center'
      },
      headerTintColor:'#F2F2F2',
      headerLeft: (
        <TouchableOpacity style={styles.button} onPress={() => navigate('Setting')} >
          <Image source={require('../Images/Icons/settings_light.png')} style={{width:30,height:30}} />
        </TouchableOpacity>
      ),
      headerStyle:{
        backgroundColor:'#117BE9'
      }
    };
  };
      
  render() {

    const { navigate } = this.props.navigation;

    return (
      <ScrollableTabView renderTabBar={() => <DefaultTabBar/>} tabBarPosition='bottom'>
        <View style={styles.content} tabLabel='首页'>
            <View style={{flex: 3}}>
              <IndexGrid/>
            </View>
            <View style={{flex: 1}}>
                <Preview/>
            </View>
            <View style={{flex: 2, backgroundColor: 'steelblue'}} >
              <Text>登陆信息: {this.state.userInfo.entName}</Text>
            </View>
            <View style={{flex: 1}}>
                <IndexGrid />
            </View>
        </View>

        <ScrollView tabLabel='项目'>
        <Text>#项目</Text>
        </ScrollView>

        <View style={styles.content} tabLabel='企业'>
          <Text>#企业</Text>
        </View>

        <View style={styles.content} tabLabel='统计'>
          <WebView style={{width:320,height:320}} source={{uri: 'https://www.baidu.com/'}}style={{marginTop: 20}}/>
        </View>
        </ScrollableTabView>
    );
  }
}


    const styles = StyleSheet.create({
        content: {
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: '#EBEBEB',
            flex: 1
      },
      button: {
        padding: 10,
      }
    });


    AppRegistry.registerComponent('IGreenBuy', () => HomeScreen);