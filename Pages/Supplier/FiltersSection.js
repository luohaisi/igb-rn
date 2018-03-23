/**
 * 20180309
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SegmentedControl, WhiteSpace, Flex, List, Button, WingBlank, Radio, PickerView, DatePicker, SearchBar } from 'antd-mobile';
import { 
  getFilterCategories, 
  getFilterEnts, 
  getFilterLocations, 
  dateFormat, 
  // getDateInterval 
} from '../../Utils/functions'
const RadioItem = Radio.RadioItem;

var ls = require('react-native-local-storage');

export default class FiltersSection extends React.Component {

    constructor(props){
        super(props)
        // 设置默认开始时间
        this.state = {
          statCategories:[],
          subEnts:[],
          locations:[],
          cateId:null,
          cateName:'材料',
          ent:null,
          entName:'公司',
          searchKey:'',
          selectedIndex:-1,
          cataValue:null,
          entValue:null
        }
    }

    componentWillMount(){
      // 从接口请求默认数据
      ls.get('userInfo').then((data) => {

        this.setState({
          statCategories:getFilterCategories(data.statCategories),
          subEnts:getFilterEnts(data.subEnts)
        })
        // console.log('getFilterEnts',this.state.subEnts)
      });
    }

    _onSearchBarChange= (searchKey) => {
      this.setState({ searchKey });
    };

    _onSearchBarSubmit = (value) => {
  
        this._onFilterConConfirm()
    }

    onSegmentChange = (e) => {
      this.setState({
        selectedIndex:e.nativeEvent.selectedSegmentIndex
      })
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    onValueChange = (value) => {
        console.log('onValueChange', value);
    }

    onCatePickerChange = (cataValue) => {
      // console.log(cataValue);
      this.setState({
        cataValue,
        cateId:cataValue[1],
        cateName:cataValue[0].split('-')[1] + '-' + cataValue[1].split('-')[1]
      });
    }

    onEntPickerChange = (entValue) => {
      console.log('entValue', entValue);
      this.state.subEnts.map((item)=>{
        if(item.value == entValue[0]){
          this.setState({
            entName:item.label,
            entValue,
            ent:entValue[0]
          })
        }
      })
    }


    onScrollChange = (value) => {
      console.log('onScrollChange', value);
    }

    _onPressButton = () => {
      this.setState({
        selectedIndex:-1
      })
    }

    _onFilterConConfirm = () => {

      let filterCondition = {
        cateId:this.state.cateId,
        entId:this.state.ent,
        searchKey:this.state.searchKey,
        pageSize:100,
        pageNumber:1,
      }
      this.props.onUpdateFilter(filterCondition)
      this._onPressButton()
    }
    
    render(){
      if(this.state.statCategories.length == 0 || this.state.subEnts.length == 0 ){
        return <Text>no data</Text>
      }

        return(
          <View>
            <SearchBar 
              placeholder="搜索"
              cancelText="搜索"
              value={this.state.searchKey}
              onCancel={this._onSearchBarSubmit}
              onSubmit={this._onSearchBarSubmit}
              onChange={this._onSearchBarChange}
              maxLength={16} 
            />
            <SegmentedControl
                values={[
                          this.state.cateName,
                          this.state.entName
                        ]}
                onChange={this.onSegmentChange}
                onValueChange={this.onValueChange}
                selectedIndex={this.state.selectedIndex}
                // tintColor={'#8ac0eb'}
                style={{backgroundColor:'#FFFFFF'}}
            />
            {this.state.selectedIndex > -1 && 
              <View onPress={()=>{console.log('_onPressButton')}} style={styles.TouchableOpacity}>
                
                {this.state.selectedIndex == 0 &&
                  <PickerView
                    onChange={this.onCatePickerChange}
                    onScrollChange={this.onScrollChange}
                    value={this.state.cataValue}
                    data={this.state.statCategories}
                    cascade={true}
                    cols={2}
                  />
                }


                {this.state.selectedIndex == 1 &&
                  <PickerView
                    onChange={this.onEntPickerChange}
                    value={this.state.entValue}
                    data={this.state.subEnts}
                    cols={1}
                  />
                }

                <Flex style={{marginBottom:10}}>
                  <Flex.Item>
                    <Button onClick={this._onPressButton} size="small" style={{ marginRight: 4 }}>取消</Button>
                  </Flex.Item>
                    {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
                  <Flex.Item>
                    <Button  onClick={this._onFilterConConfirm} type="ghost" size="small" style={{ marginRight: 4 }}>确定</Button>
                  </Flex.Item>
                </Flex>
              </View>
            }
          </View>
        )
    }
}

const styles = StyleSheet.create({
  TouchableOpacity:{
    backgroundColor:'#FFFFFF',
    opacity: 1,
    padding:0,
    margin:0,
    zIndex: 80
  },
  mask:{
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.1,
    zIndex: 79
  }
})