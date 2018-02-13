/**
 * @author luohaisi
 * 20180211
 */
import React from 'react'
import {Image } from 'react-native';
// tabBar
const home = require('../Images/Icons2/home.png')
const homeFill = require('../Images/Icons2/home_fill.png')
const news = require('../Images/Icons2/news.png')
const newsFill = require('../Images/Icons2/news_fill.png')
const addresBook = require('../Images/Icons2/address_book.png')
const addresBookFill = require('../Images/Icons2/address_book_fill.png')
const rank = require('../Images/Icons2/rank.png')
const rankFill = require('../Images/Icons2/rank_fill.png')
const discover = require('../Images/Icons2/discover.png')
const discoverFill = require('../Images/Icons2/discover_fill.png')

const location = require('../Images/Icons2/location.png')
const calendar = require('../Images/Icons2/calendar.png')
const list = require('../Images/Icons2/list.png')
const search = require('../Images/Icons2/search.png')
const sort = require('../Images/Icons2/sort.png')
const mail = require('../Images/Icons2/mail.png')
const more = require('../Images/Icons2/more.png')
const mark = require('../Images/Icons2/mark.png')

export default class Ionicons extends React.Component {
    
    render(){
        // 获取图片
        const getIcon = (name) => {
            switch (name){
                case 'ios-home':
                    return home
                case 'ios-home-outline':
                    return homeFill
                case 'ios-list-box':
                    return news
                case 'ios-list-box-outline':
                    return newsFill
                case 'ios-information-circle':
                    return addresBook
                case 'ios-information-circle-outline':
                    return addresBookFill
                case 'ios-stats':
                    return rank
                case 'ios-stats-outline':
                    return rankFill
                case 'ios-eye':
                    return discover
                case 'ios-eye-outline':
                    return discoverFill
                    
                case 'ios-locate-outline':
                    return location
                case 'md-calendar':
                    return calendar
                case 'ios-list-outline':
                    return sort
                case 'logo-buffer':
                    return list
                default:
                    return more
            }
        };
        return (
            <Image 
                source={getIcon(this.props.name)} 
                style={{width:this.props.size,height:this.props.size}} />
        )
    }
}