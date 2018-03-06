/**
 * 20180205
 * @author luohaisi
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WhiteSpace, Flex, List, Button, Picker, Tag } from 'antd-mobile';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from '../../Components/Ionicons';

import DateRangePicker from '../../Components/DateRangePicker'
import {
  getDateInterval,
  dateFormat
} from '../../Utils/functions'

export default class DeteFilterSection extends React.Component {
  constructor(props){
    super(props)
    
    this.defaultCity = '全国'
    this.state = {
      city: this.defaultCity,
      shortCutName:this.props.params.dateFrom + ' 至 ' + this.props.params.dateTo,
      showDatePicker:false
    };
  }

  onCityChange = (val) => {
    // console.log('onCityChange:val', val[0])
    const city = this.props.params.locations.map((item) => {
      if(item.value == val[0]){
        return item.label
      }
    })
    this.setState({
      city:city
    })
    this.props.onCityChange(val[0])
  }

  updateChart = () => {

  }

  onPickedChanged = (selected, item) => {
    selected && this.setState({
        shortCutName:item.name,
        showDatePicker:false
    })
    // update
    this.dateFrom = item.value.from
    this.dateTo = item.value.to
    const value = {
      dateFrom: item.value.from,
      dateTo: item.value.to
    }
    this.props.onDateRangePickerConfirm(value)
}

onDateRangePickerConfirm = (value) => {

    // console.log('onDateRangePickerConfirm:value', value)
    this.dateFrom = value.dateFrom && dateFormat(value.dateFrom)
    this.dateTo   = value.dateTo && dateFormat(value.dateTo)

    this.setState({
        shortCutName:this.dateFrom + ' 至 ' + this.dateTo
    })

    this.props.onDateRangePickerConfirm({
      dateFrom:dateFormat(value.dateFrom),
      dateTo:dateFormat(value.dateTo),
    })
}

renderDateRangeView = () => {

  return <DateRangePicker
              visible={this.state.showDatePicker}
              onClose={()=>this.setState({showDatePicker: false})}
              onConfirm={this.onDateRangePickerConfirm}
          >
              <Flex wrap="wrap">    
                  {
                      [
                          {name:'近一年',value:getDateInterval(365)},
                          {name:'2017',value:{from:'2017-01-01', to:'2017-12-31'}},
                          {name:'上个月',value:[]},
                          // {name:'三季度',value:[]},
                          // {name:'四季度',value:[]}
                      ].map((item,key) => {
                          return (<Tag 
                                      key={key}
                                      selected={item == this.state.shortCutName ? true : false}
                                      onChange={(selected)=>this.onPickedChanged(selected, item)}
                                  >
                                      {item.name}
                                  </Tag>)
                      })
                  }
              </Flex>
      </DateRangePicker>
};

  render() {

    return (
      <List.Item extra={this.state.showDatePicker && this.renderDateRangeView()}>
        <Flex>

          <Flex.Item style={{alignItems:'flex-start', flex:3}}>
            
            <Picker data={this.props.params.locations} cols={1} onChange={this.onCityChange}>
              <Button
                inline 
                size="small" 
                style={{borderWidth:0}}
              >
                <Ionicons style={{padding:0,margin:0}} name={'ios-locate-outline'} size={15} color={'#58b6ef'} />
                <Text style={styles.dateText}>&nbsp;&nbsp;&nbsp;{this.state.city}</Text> 
              </Button>
            </Picker>
          </Flex.Item>
          
          <Flex.Item style={{alignItems:'flex-start', flex:4}}>
            
            <Button
              inline 
              size="small" 
              style={{borderWidth:0}}
              onClick={() => this.setState({showDatePicker:true})}
            >
              <Ionicons name={'md-calendar'} size={15} color={'#58b6ef'} />
              <Text style={styles.dateText}>&nbsp;&nbsp;&nbsp; {this.state.shortCutName}</Text>
            </Button>
          </Flex.Item>

        </Flex>
        
      </List.Item>
    );
  }
}

  const styles = StyleSheet.create({
    dateText:{
      color:'#777'
    }
  })