/**
 * @author luohaisi
 * 20180201
 */
import React from 'react'
import {
    Modal,
    WingBlank, 
    WhiteSpace,
    DatePicker,
    List
} from 'antd-mobile'

// import {
//     dateFormat
// } from '../utils/functions'

export default class DateRangePicker extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            dateFrom:new Date(),
            dateTo:new Date()
        }
        // console.log('DateRangePicker:init')
    }

    render(){

        return (
            <Modal
                visible={this.props.visible}
                transparent
                popup={true}
                // closable
                animationType="fade"
                onClose={this.props.onClose}
                style={{width:'90%'}}
                footer={[
                    { text: '取消', onPress: this.props.onClose },
                    { text: '确定', onPress: ()=>{
                        this.props.onConfirm({
                            dateFrom: this.state.dateFrom,
                            dateTo: this.state.dateTo,
                        })
                        this.props.onClose()
                    }}
                ]}
            >
                <WingBlank>
                    <WhiteSpace size="lg" />
                    {this.props.children}
                    <WhiteSpace size="lg" />
                    <List>
                        <DatePicker
                            mode="date"
                            title="开始日期"
                            // extra={this.state.dateFrom && dateFormat(this.state.dateFrom)}
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
            </Modal>
        )
    }
}
