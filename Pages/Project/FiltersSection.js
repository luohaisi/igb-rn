/**
 * 20180309
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  SegmentedControl, 
  WhiteSpace, 
  Flex, 
  List, 
  Button, 
  WingBlank, 
  Radio, 
  PickerView, 
  DatePicker, 
  SearchBar, 
  Tag 
} from 'antd-mobile';
import { 
  getFilterCategories, 
  getFilterEnts, 
  getFilterLocations, 
  getFilterPcItems,
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

// const filterList  = [0,1,2,3,4,5,6]
const filterList  = ['材料','进行中','比价','公司','时间','城市', 'PC类型']

export default class FiltersSection extends React.Component {

    constructor(props){
        super(props)
        // 设置默认开始时间
        const current = new Date();
        current.setDate(current.getDate() - 365)

        this.state = {
          statCategories:[],
          // subEnts:props.subEnts,
          locations:[],
          pcItems:[],
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
          dateTo : new Date(),
          pcItemsValue:null,
          pc_type:'PC预制外墙板',
          spec:"清水",
        }

        this.showFilterList = this.props.showFilterList == undefined ? [0,1,2,3,4,5] : this.props.showFilterList

        this.filterList = this.showFilterList.map((item) => {
          return filterList[item]
        })

    }

    componentWillMount(){
      // 从接口请求默认数据
      ls.get('userInfo').then((data) => {

        this.setState({
          statCategories:getFilterCategories(data.statCategories),
          // subEnts:getFilterEnts(data.subEnts),
          locations:getFilterLocations(data.locations),
          pcItems:getFilterPcItems(data.pcItems)
        })
        // console.log('getFilterPcItems',this.state.pcItems)
      });
    }

    _onSearchBarChange= (searchKey) => {
      this.setState({ searchKey });
    };

    _onSearchBarSubmit = (value) => {
  
        this._onFilterConConfirm()
    }

    // onSelect = (opt) => {
    //     console.log(opt.props.value);
    //     this.setState({
    //       visible: false,
    //       selected: opt.props.value,
    //     });
    // }

    onSegmentChange = (e) => {
      this.setState({
        selectedIndex:e.nativeEvent.selectedSegmentIndex
      })
        // console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    onValueChange = (value) => {
        // console.log('onValueChange', value);
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
      // console.log(value);
      this.setState({
        piStatus:value
      });
    }

    onTypePickerChange = (obj) => {
      // console.log(obj);
      this.setState({
        piType:obj.value,
        piTypeName:obj.label
      });
    }

    onEntPickerChange = (entValue, subEnts) => {
      // console.log('entValue', entValue);
      subEnts.map((item)=>{
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
      // console.log('locationValue', locationValue);
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

    onPcItemsPickerChange = (pcItemsValue) => {

      this.setState({
        pcItemsValue,
        pc_type:pcItemsValue[0].split('-')[0],
        spec:pcItemsValue[0].split('-')[1]
      })
    }

    onScrollChange = (value) => {
      // console.log('onScrollChange', value);
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
        pc_type:this.state.pc_type,
        spec:this.state.spec,
        searchKey:this.state.searchKey,
        pageSize:10,
        pageNumber:1,
      }
      this.props.onUpdateFilter(filterCondition)
      this._onPressButton()
    }
    
    render(){

        const subEnts = this.props.subEnts ? this.props.subEnts : []
  

      if(this.state.statCategories.length == 0 || this.state.locations.length == 0){
        // console.log('render:1',this.state.statCategories.length>0 ? true : false)
        return <Text>no data</Text>
      }
      // console.log('render:2',this.state.statCategories.length>0 ? true : false)
      // console.log('render:2',this.state.subEnts)
        return(
          <View>

            {this.props.showSearchbar == true || this.props.showSearchbar == undefined &&
              <SearchBar 
                placeholder="搜索"
                cancelText="搜索"
                value={this.state.searchKey}
                onCancel={this._onSearchBarSubmit}
                onSubmit={this._onSearchBarSubmit}
                onChange={this._onSearchBarChange}
                maxLength={16} 
              />
            }

            <SegmentedControl
                // values={[
                //           this.state.cateName, 
                //           this.state.piStatus, 
                //           this.state.piTypeName,
                //           this.state.entName,
                //           '时间', 
                //           this.state.locstionName
                //         ]}
                values={this.filterList}
                onChange={this.onSegmentChange}
                onValueChange={this.onValueChange}
                selectedIndex={this.state.selectedIndex}
                // tintColor={'#8ac0eb'}
                style={{backgroundColor:'#FFFFFF'}}
            />
            <WhiteSpace />

            {/* 筛选内容标签start */}
            <Flex wrap="wrap" style={{paddingLeft:20, backgroundColor:'#FFFFFF', borderRadius:5}}>
              {this.state.cateName && this.state.cateName != '材料' && this.state.cateName != '材料-全部' &&
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>{this.state.cateName}</Text>
              }
              {this.state.piStatus && this.state.piStatus != '全部' && this.showFilterList.indexOf(1) > -1 &&
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>{this.state.piStatus}</Text>
              }
              {this.state.piTypeName && this.state.piTypeName != '全部' &&  this.showFilterList.indexOf(2) > -1 &&
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>{this.state.piTypeName}</Text>
              }
              {this.state.entName && this.state.entName != '公司' &&  this.showFilterList.indexOf(3) > -1 &&
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>{this.state.entName}</Text>
              }
              {this.showFilterList.indexOf(4) > -1 &&
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>
                  {dateFormat(this.state.dateFrom)} - {dateFormat(this.state.dateTo)}
                </Text>
              }
              {this.state.locstionName && this.state.locstionName != '全国' &&  this.showFilterList.indexOf(5) > -1 &&
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>{this.state.locstionName}</Text>
              }

              {this.showFilterList.indexOf(6) > -1 && 
                <Text style={styles.filterTag} onPress={() => console.log('1st')}>
                    {this.state.pc_type} - {this.state.spec}
                </Text>
              }

            </Flex>
            {/* 筛选内容标签end */}
            <WhiteSpace />

            {this.state.selectedIndex > -1 && 
              <View onPress={()=>{console.log('_onPressButton')}} style={styles.TouchableOpacity}>
                
                {this.showFilterList[this.state.selectedIndex] == 0 &&
                  <PickerView
                    onChange={this.onCatePickerChange}
                    onScrollChange={this.onScrollChange}
                    value={this.state.cataValue}
                    data={this.state.statCategories}
                    cascade={true}
                    cols={2}
                  />
                }

                {this.showFilterList[this.state.selectedIndex] == 1 &&
                  <View style={{height:216}}>
                    {statusList.map(i => (
                        <RadioItem 
                          key={i.value} 
                          checked={this.state.piStatus === i.value} 
                          onChange={() => this.onStatePickerChange(i.value)}
                        >
                          {i.label}
                        </RadioItem>
                    ))}
                  </View>
                }

                {this.showFilterList[this.state.selectedIndex] == 2 &&

                  <View style={{height:216}}>
                    {typeList.map(obj => (
                        <RadioItem 
                          key={obj.value} 
                          checked={this.state.piType === obj.value} 
                          onChange={() => this.onTypePickerChange(obj)}
                        >
                          {obj.label}
                        </RadioItem>
                    ))}
                  </View>
                }

                {this.showFilterList[this.state.selectedIndex] == 3 &&
                  <PickerView
                    onChange={(value)=>this.onEntPickerChange(value, subEnts)}
                    value={this.state.entValue}
                    data={subEnts}
                    cols={1}
                  />
                }

                {this.showFilterList[this.state.selectedIndex] == 4 &&
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

                {this.showFilterList[this.state.selectedIndex] == 5 &&
                  <PickerView
                    onChange={this.onLocationPickerChange}
                    value={this.state.locationValue}
                    data={this.state.locations}
                    cols={1}
                  />
                }

                {this.showFilterList[this.state.selectedIndex] == 6 &&
                  <PickerView
                    onChange={this.onPcItemsPickerChange}
                    value={this.state.pcItemsValue}
                    data={this.state.pcItems}
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
  filterTag:{
    margin:5,
    padding:3,
    borderWidth:1, 
    borderColor:'#eee', 
    // color:'#f19736',
    color:'#777',
    backgroundColor:'#eee',
    // borderRadius:5
  }
})