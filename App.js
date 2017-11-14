import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, WebView } from 'react-native';

import { StackNavigator } from 'react-navigation';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './Components/DefaultTabBar';

import Index from './Components/HomePage/Index';
import ToolBar from './Components/Common/ToolBar';
import Grid from './Components/Common/Grid';
import Preview from './Components/Common/Preview';



class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    // const isInfo = state.params.mode === 'info';
    // const { user } = state.params;
    return {
      title: '绿智汇',
      headerRight: (
        <Button
          title="设置"
          onPress={() => navigate('Index')}
        />
      ),
    };
  };
  
  render() {

    const { navigate } = this.props.navigation;

		return (
      

			<ScrollableTabView
				renderTabBar={() => <DefaultTabBar/>}
				tabBarPosition='bottom'>
				<View style={styles.content} tabLabel='首页'>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Index')}
            >
              <Text>Scrollable tabs example</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2}} >
              <Grid/>
          </View>
          <View style={{flex: 1}}>
              <Preview/>
          </View>
          <View style={{flex: 2, backgroundColor: 'steelblue'}} >
              <WebView style={{width:320,height:320}}
                source={{uri: 'https://www.baidu.com/'}}
                style={{marginTop: 20}}
              />
          </View>
				</View>

        <ScrollView tabLabel='项目'>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Text style={{fontSize:96}}>If you like</Text>
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Image source={require('./Img/css.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>

				<View style={styles.content} tabLabel='企业'>
					<Text>#企业</Text>
				</View>

				<View style={styles.content} tabLabel='统计'>
          <WebView style={{width:320,height:320}}
            source={{uri: 'https://www.baidu.com/'}}
            style={{marginTop: 20}}
          />
				</View>
			</ScrollableTabView>
		);
	}
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Index:{screen: Index}
});

export default App;

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
