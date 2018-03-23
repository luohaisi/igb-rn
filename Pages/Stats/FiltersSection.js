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
        const current = new Date();
        current.setDate(current.getDate() - 365)

        this.state = {
          statCategories:[],
          subEnts:[],
          locations:[],
          cateId:null,
          cateName:'材料',
          piTypeName:'比价',
          ent:null,
          entName:'公司',
          location:null,
          locstionName:'全国',
          pbBeginDate:'',
          pbEndDate:'',
          selectedIndex:-1,
          cataValue:null,
          entValue:null,
          dateFrom : current,
          dateTo : new Date()
        }

    }

    componentWillMount(){
      // 从接口请求默认数据
      ls.get('userInfo').then((data) => {

        this.setState({
          statCategories:getFilterCategories(data.statCategories),
          subEnts:getFilterEnts(data.subEnts),
          locations:getFilterLocations(data.locations)
        })
        // console.log('getFilterEnts',this.state.subEnts)
      });
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

    onLocationPickerChange = (locationValue) => {
      console.log('locationValue', locationValue);
      this.state.locations.map((item)=>{
        if(item.value == locationValue[0]){
          this.setState({
            locstionName:item.label,
            locationValue,
            location:locationValue[0]
          })
        }
      })
    }

    _onPressButton = () => {
      this.setState({
        selectedIndex:-1
      })
    }

    _onFilterConConfirm = () => {

      let filterCondition = {
        cateId:this.state.cateId,
        ent:this.state.ent,
        location:this.state.location,
        pbBeginDate:dateFormat(this.state.dateFrom),
        pbEndDate:dateFormat(this.state.dateTo),
        pageSize:100,
        pageNumber:1,
      }
      this.props.onUpdateFilter(filterCondition)
      this._onPressButton()
    }
    
    render(){
      if(this.state.subEnts.length == 0 || this.state.locations.length == 0){
        // console.log('render:1',this.state.statCategories.length>0 ? true : false)
        return <Text>no data</Text>
      }
      // console.log('render:2',this.state.statCategories.length>0 ? true : false)
      // console.log('render:2',this.state.subEnts)
        return(
          <View style={{backgroundColor:'#fff'}}>
            <WhiteSpace />
            <SegmentedControl
                values={[
                          this.state.cateName,
                          this.state.entName,
                          '时间', 
                          this.state.locstionName
                        ]}
                onChange={this.onSegmentChange}
                onValueChange={this.onValueChange}
                selectedIndex={this.state.selectedIndex}
                // tintColor={'#8ac0eb'}
                style={{backgroundColor:'#FFFFFF'}}
            />

            <Flex style={{margin:5}}>
              <Flex.Item></Flex.Item>
              <Flex.Item></Flex.Item>
              <Flex.Item>
                <Button  onClick={this._entCompare} size="small" style={styles.botton}>
                  <Text style={{color:'orange'}}>企业对比</Text>
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button  onClick={this._onFilterConConfirm} size="small" style={styles.botton}>
                  <Text style={{color:'orange'}}>上海砼</Text>
                </Button>
              </Flex.Item>
            </Flex>

            {this.state.selectedIndex > -1 && 
              <View onPress={()=>{console.log('_onPressButton')}} style={styles.TouchableOpacity}>
                
                {this.state.selectedIndex == 0 &&
                  <PickerView
                    onChange={this.onCatePickerChange}
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

                {this.state.selectedIndex == 2 &&
                  <WingBlank>
                      <List style={{height:201,paddingTop:20}}>
                          <DatePicker
                              mode="date"
                              title="开始日期"
                              value={this.state.dateFrom }
                              onChange={date => this.setState({ dateFrom: date })}
                          >
                              <List.Item arrow="horizontal">开始日期</List.Item>
                          </DatePicker>

                          <DatePicker
                              mode="date"
                              title="结束日期"
                              // extra={this.state.dateTo && dateFormat(this.state.dateTo)}
                              value={this.state.dateTo}
                              onChange={date => this.setState({ dateTo: date })}
                          >
                              <List.Item arrow="horizontal">结束日期</List.Item>
                          </DatePicker>
                      </List>
                      <WhiteSpace size="lg" />
                  </WingBlank>
                }

                {this.state.selectedIndex == 3 &&
                  <PickerView
                    onChange={this.onLocationPickerChange}
                    value={this.state.locationValue}
                    data={this.state.locations}
                    cols={1}
                  />
                }

                <Flex style={{margin:5}}>
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
  },
  botton:{ 
    borderColor:'orange', 
    marginRight: 4, 
    marginLeft: 4 
  }
})