/**
 * 20180115
 * @author luohaisi
 */

//  cailiao ID 还材料名称
 const getCateName = (cateId) => {
    switch(cateId){
        case 1:
            return '混凝土'
        case 2:
            return '水泥'
        case 3:
            return '螺纹钢'
        case 99:
            return '其他'
        default:
            return ''
    }
 }

 //  
 const cateNameObj = {
    1:'混凝土',
    2:'水泥',
    3:'螺纹钢',
    99:'其他'
}

// 获取图片css
const getCateImg = (cateName) => {
    switch (cateName){
        case '混凝土':
            return 'concrete-img';
        case '水泥':
            return 'cement-img';
        case '螺纹钢':
            return 'steel-img';
        case '全部':
            return 'total-img'
    }
};

// 首页顶部6个按钮文字样式
const getProjectItemColor = (display) => {
    switch (display) {
        case '进行中':
            return 'small-margin-p running-project';

        case '采购总数':
            return 'small-margin-p total-project';

        case '已结束':
            return 'small-margin-p finished-project';

        default:
            return 'small-margin-p type-project';
    }
}

// 首页顶部6个按钮图片样式
const getGridItemColor = (display) => {
    switch (display) {
        case '进行中':
            return 'grid-item-running-img';

        case '采购总数':
            return 'grid-item-total-img';

        case '已结束':
            return 'grid-item-finished-img';

        case '比价采购':
            return 'grid-item-compare-img';
        case '招标采购':
            return 'grid-item-request-img';
        case '协议采购':
            return 'grid-item-contract-img';
    }
}

// 材料单位
const getCateUnit = (id) => {
    switch (id) {
        case 1:
            return '立方';

        default :
            return '吨';
    }
}

/**
 * 获取时间区间
 * param    days: number
 * return   {from:'2017-12-16', to:'2018-1-15'}
 */

const getDateInterval = (days) => {
    const current = new Date();

    const currentDay   = current.getDate()
    const currentMonth = current.getMonth() + 1
    const currentYear  = current.getFullYear()
    const endDate      = currentYear + '-' + currentMonth + '-' + currentDay

    // 重设时间
    current.setDate(current.getDate() - days)

    const startDay = current.getDate()
    const startMonth = current.getMonth() + 1
    const startYear = current.getFullYear()
    const fromDate   = startYear + '-' + startMonth + '-' + startDay

    const config = {
        from: fromDate,
        to: endDate
    };

    return config
}

const dateFormat = (dateObj) => {
    // return dateObj.toLocaleString().split(' ')[0]
    // console.log('dateFormat', dateObj)
    return dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate()
}

 export {
    getCateName,
    cateNameObj,
    getCateImg,
    getProjectItemColor,
    getGridItemColor,
    getCateUnit,
    getDateInterval,
    dateFormat
 }