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

const typeList =[
  {value: 0, label: '全部'},
  {value: 2, label: '比价'},
  {value: 4, label: '招标'},
  {value: 5, label: '协议'},
];
const statusList =[
  {label: '全部', value: '全部'},
  {label: '进行中', value: '进行中'},
  {label: '已结束', value: '已结束'},
];

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
          piStatus:'进行中',
          piType:2,
          piTypeName:'比价',
          ent:null,
          entName:'公司',
          location:null,
          locstionName:'全国',
          pbBeginDate:'',
          pbEndDate:'',
          searchKey:'',
          selectedIndex:-1,
          cataValue:null,
          entValue:null,
          dateFrom : current,
          dateTo : new Date()
        }

        // ls.get('userInfo').then((data) => {
        //   console.log('cons:statCategories')
        //   this.setState({
        //     statCategories:data.statCategories
        //   })
        // });

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

    _onSearchBarChange= (searchKey) => {
      this.setState({ searchKey });
    };

    _onSearchBarSubmit = (value) => {
  
        this._onFilterConConfirm()
    }

    onSelect = (opt) => {
        console.log(opt.props.value);
        this.setState({
          visible: false,
          selected: opt.props.value,
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
    onStatePickerChange = (value) => {
      console.log(value);
      this.setState({
        piStatus:value
      });
    }

    onTypePickerChange = (obj) => {
      console.log(obj);
      this.setState({
        piType:obj.value,
        piTypeName:obj.label
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
        piStatus:this.state.piStatus,
        piType:this.state.piType,
        ent:this.state.ent,
        location:this.state.location,
        pbBeginDate:dateFormat(this.state.dateFrom),
        pbEndDate:dateFormat(this.state.dateTo),
        searchKey:this.state.searchKey,
        pageSize:100,
        pageNumber:1,
      }
      this.props.onUpdateFilter(filterCondition)
      this._onPressButton()
    }
    
    render(){
      if(this.state.statCategories.length == 0 || this.state.subEnts.length == 0 || this.state.locations.length == 0){
        // console.log('render:1',this.state.statCategories.length>0 ? true : false)
        return <Text>no data</Text>
      }
      // console.log('render:2',this.state.statCategories.length>0 ? true : false)
      // console.log('render:2',this.state.subEnts)
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
                          this.state.piStatus, 
                          this.state.piTypeName,
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
                  statusList.map(i => (
                    <RadioItem 
                      key={i.value} 
                      checked={this.state.piStatus === i.value} 
                      onChange={() => this.onStatePickerChange(i.value)}
                    >
                      {i.label}
                    </RadioItem>
                  ))
                }

                {this.state.selectedIndex == 2 &&
                  typeList.map(obj => (
                    <RadioItem 
                      key={obj.value} 
                      checked={this.state.piType === obj.value} 
                      onChange={() => this.onTypePickerChange(obj)}
                    >
                      {obj.label}
                    </RadioItem>
                  ))
                }

                {this.state.selectedIndex == 3 &&
                  <PickerView
                    onChange={this.onEntPickerChange}
                    value={this.state.entValue}
                    data={this.state.subEnts}
                    cols={1}
                  />
                }

                {this.state.selectedIndex == 4 &&
                  <WingBlank>
                      <List>
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

                {this.state.selectedIndex == 5 &&
                  <PickerView
                    onChange={this.onLocationPickerChange}
                    value={this.state.locationValue}
                    data={this.state.locations}
                    cols={1}
                  />
                }

                <Flex>
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