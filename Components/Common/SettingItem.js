import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from 'react-native';

export default class SettingItem extends Component {

  constructor(props) {
    super(props);

    this.onPress = (navigate) => {
      // alert(this.props.path)
      // typeof navigate == "function" && navigate(this.props.path)
      navigate(this.props.path)
    }

  }

  render() {

    let item = {
      key: this.props.item,
      pic: this.props.icon,
      path: this.props.path,
    };

    return (
      
      <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={()=>this.onPress}>
          <View style={{width: '25%', height: 50, alignItems:'flex-start'}}>
          <Text style={styles.item}>
          <Image source={item.pic} style={{width: 40, height: 40}} />
          </Text>
          </View>
          <View style={{width: '50%', height: 50, alignItems:'center'}}>
          <Text style={styles.item}>{item.key} {item.path}</Text>
          </View>
          <View style={{width: '25%', height: 50, alignItems:'flex-end'}}>
          <Text style={styles.item}> > </Text>
          </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
     backgroundColor:'rgb(19,125,188)',
    },
    cell:{
      
     borderBottomWidth: 1,
     borderBottomColor: '#F2F2F2',
    },
    item: {
      padding: 10,
      margin:10,
      fontSize: 18,
      height: 50,
      color:'#F2F2F2'
    },
  })

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => SettingItem);