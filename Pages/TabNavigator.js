/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, Button } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from '../Components/Ionicons';

import HomeScreen from './Home/HomeScreen'
import ProjectScreen from './Project/ProjectScreen'
import SupplierScreen from './Supplier/SupplierScreen'
import StatsScreen from './Stats/StatsScreen'
import DiscoveryScreen from './Discovery/DiscoveryScreen'

const getHeaderTitle = (routeName) => {
  switch (routeName){
    case 'Home':
      return '首页'
    case 'Project':
      return '项目'
    case 'Supplier':
      return '供应商'
    case 'Stats':
      return '统计'
    case 'Discovery':
      return '发现'
    default:
      return '未知'
  }
}


export default TabNavigator({
    Home: { screen: HomeScreen },
    Project: { screen: ProjectScreen },
    Supplier: { screen: SupplierScreen },
    Stats: { screen: StatsScreen },
    Discovery: { screen: DiscoveryScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Project') {
            iconName = `ios-list-box${focused ? '' : '-outline'}`;
        } else if (routeName === 'Supplier') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Stats') {
            iconName = `ios-stats${focused ? '' : '-outline'}`;
        } else if (routeName === 'Discovery') {
            iconName = `ios-eye${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      title: getHeaderTitle(navigation.state.routeName),
      headerTintColor:'#F2F2F2',
      headerStyle:{
        backgroundColor:'#117BE9'
      },
      headerRight: (
          <Button
            onPress={() => navigation.navigate('Setting')}
            title="设置"
            color="#fff"
          />
        ),
    }),
    tabBarOptions: {
    //   activeTintColor: 'tomato',
      // activeTintColor: '#117BE9',
      activeTintColor: '#58b6ef',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#FFFFFF',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  },
  
);