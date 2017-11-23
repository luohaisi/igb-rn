import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Toast, Modal } from 'antd-mobile';

const alert = Modal.alert;



export default class PasswordScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        passwordOld: '',
        passwordMew: '',
        passwordMewConfirm: '',
      };
  }

  static navigationOptions = {
    headerTitle: '设置密码',
    headerTitleStyle:{
      color : '#F2F2F2',
      // alignSelf:'center'
    },
    headerStyle:{
      backgroundColor:'rgb(19,125,188)'
    },
    headerTintColor:'#F2F2F2'  // 返回箭头的颜色
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1,justifyContent:'space-between', alignItems: 'center'}}>
            <View style={{width: '80%'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    secureTextEntry={true}
                    placeholder={'旧密码'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    secureTextEntry={true}
                    placeholder={'新密码'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    secureTextEntry={true}
                    placeholder={'确认新密码'}
                    underlineColorAndroid="rgb(238,238,238)"
                />
            </View>
            <View style={{width: '80%'}}>
                <Button type="primary" 
                    size="small" 
                    inline 
                    onClick={this.logout} 
                    style={styles.logoutButton} 
                  color="#f2f2f2">确定</Button>
            </View>
        </View>
        <View style={{flex: 1,justifyContent:'flex-start',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>alert(
                                                    '温馨提示',
                                                    '请联系我们的工作人员 021-12345678',
                                                    [{ text: '好的' }]
                                                )}>
                <Text>忘记密码?</Text>
            </TouchableOpacity>
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
      height: 50, 
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
AppRegistry.registerComponent('IGreenBuy', () => PasswordScreen);