import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Toast, Modal } from 'antd-mobile';

const alert = Modal.alert;

export default class FeedbackScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        feedback: '',
      };
  }

  static navigationOptions = {
    headerTitle: '意见反馈',
    headerTitleStyle:{
      color : '#F2F2F2',
      // alignSelf:'center'
    },
    headerStyle:{
      backgroundColor:'rgb(19,125,188)'
    }
  };

  submitFeedback = () =>{
    
        Toast.loading('提交成功!', 1, () => {
    
          // console.log('Load complete !!!');
        });
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{flex: 1,justifyContent:'space-between', alignItems: 'center'}}>
            <View style={{width: '80%',justifyContent:'flex-start'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(feedback) => this.setState({feedback})}
                    multiline={true}
                    placeholder={'请留下您的宝贵意见'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <Button type="primary" 
                    size="small" 
                    inline 
                    onClick={this.submitFeedback} 
                    style={styles.logoutButton} 
                  color="#f2f2f2">提交</Button>
            </View>
        </View>
        <View style={{flex: 1}}>
 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor:'rgb(238,238,238)',
  },
  textInput:{
    height: 200, 
    backgroundColor: '#FFF',
    paddingLeft: 20,
    fontSize:16
  },
  logoutButton:{
      height: 50, 
      backgroundColor: 'orange',
      borderColor:'#F2F2F2',
      marginBottom:20
    },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('IGreenBuy', () => FeedbackScreen);