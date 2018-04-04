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

// item type
const compare = require('../Images/itemType/compare.png')
const invite = require('../Images/itemType/invite.png')
const agreement = require('../Images/itemType/agreement.png')

// item detail page
const piTitle = require('../Images/Icons2/pi_title.png') 
const piEnt = require('../Images/Icons2/pi_ent.png') 
const listIcon = require('../Images/Icons2/list_icon.png') 

// discovery page logo
const roadBridge = require('../Images/logo/road-bridge.png') 
const underEngineer = require('../Images/logo/under-engineer.png') 
const spongeCity = require('../Images/logo/sponge-city.png') 
const healthBuilding = require('../Images/logo/health-building.png') 
const greenBuilding = require('../Images/logo/green-building.png') 
const greenProduce = require('../Images/logo/green-produce.png') 
const cleanEnergy = require('../Images/logo/clean-energy.png') 

const locationIcon = require('../Images/material/location.png') 
const materialIcon = require('../Images/material/material.png') 
const TimeIcon = require('../Images/material/time.png') 

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
                // item type
                case 'project-compare':
                    return compare
                case 'project-invite':
                    return invite
                case 'project-agreement':
                    return agreement
                // item datail page
                case 'item-detail-title':
                    return piTitle
                case 'item-detail-ent':
                    return piEnt
                case 'item-detail-list-icon':
                    return listIcon

                // discovery page logo
                // 道路桥梁
                case 'road-bridge':
                    return roadBridge
                // 地下工程
                case 'under-engineer':
                    return underEngineer
                // 海绵城市
                case 'sponge-city':
                    return spongeCity
                // 健康建筑
                case 'health-building':
                    return healthBuilding
                // 绿色建筑
                case 'green-building':
                    return greenBuilding
                // 绿色生产
                case 'green-produce':
                    return greenProduce
                // 清洁能源
                case 'clean-energy':
                    return cleanEnergy
                // 位置图标
                case 'location-icon' :
                    return locationIcon
                // 材料图标
                case 'material-icon' :
                    return materialIcon
                // 时间图标
                case 'time-icon' :
                    return TimeIcon

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