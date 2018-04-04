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

const testCategories = [
    {
        value: '1',
        cateId: '1',
        label: '混凝土',
        children: [
            {
                label: '全部',
                value: '100',
            },{
                label: 'C15',
                value: '101',
            },{
                label: 'C20',
                value: '102',
            }, {
                label: 'C25',
                value: '103',
            },{
                label: 'C30',
                value: '104',
            },{
                label: 'C35',
                value: '105',
            },{
                label: 'C40',
                value: '106',
            },{
                label: 'C45',
                value: '107',
            },{
                label: 'C50',
                value: '108',
            },{
                label: 'C55',
                value: '109',
            },{
                label: 'C60',
                value: '110',
            },{
                label: 'C65',
                value: '111',
            },{
                label: 'C70',
                value: '112',
            },
        ],
    }, {
        value: '2',
        label: '水泥',
        children: [
            {
                label: '全部',
                value: '200',
            }, {
                label: '桥梁支柱',
                value: '201',
            }, {
                label: '预制柱',
                value: '202',
            }, {
                label: '预制梁',
                value: '203',
            },{
                label: '桥箱梁',
                value: '204',
            }, {
                label: '桥梁构建',
                value: '205',
            }, {
                label: '预制内墙板',
                value: '206',
            },{
                label: '预制飘窗版',
                value: '207',
            }, {
                label: '预制楼梯',
                value: '208',
            }, {
                label: '预制外墙板',
                value: '209',
            },{
                label: '预制构件',
                value: '210',
            }
        ],
    }, {
        value: '3',
        label: '钢筋',
        children: [
            {
                label: '全部',
                value: '300',
            },{
                label: '螺纹钢',
                value: '301'
            },{
                label: '角铁',
                value: '302'
            },{
                label: 'H型钢',
                value: '304'
            },{
                label: '角钢',
                value: '305'
            },{
                label: '钢板',
                value: '306'
            },{
                label: '槽钢',
                value: '307'
            },{
                label: '盘螺',
                value: '308'
            },{
                label: '圆钢',
                value: '309'
            },{
                label: '高线',
                value: '310'
            }
        ],
    },
];

const copyCateChildren = (children, parentId) => {
    const result = [{label: '全部', value: parentId + '-全部'}];
    children.map((cate) => {
        result.push({label: cate.name, value: cate.statCateId + '-' + cate.name});
    })
    return result;
};

const getFilterCategories = (statCategories) => {
    if (statCategories) {
        const result = [{label:'材料', value:'-材料',children:[{label:'全部', value:'-全部'}]}];
        statCategories.map((cate) => {
            if (cate.children && cate.children.length > 0) {
                result.push({label: cate.name, value: cate.statCateId + '-' + cate.name, children: copyCateChildren(cate.children, cate.statCateId)})
            } else {
                result.push({label: cate.name,  value: cate.statCateId + '-' + cate.name, children: [{label: '全部', value: cate.statCateId + '-全部'}]})
            }
        })
        return result;
    } else {
        return testCategories;
    }
}

const getFilterEnts = (subEnts) => {
    const result = [{label:'全部', value:''}]
    subEnts.map((ent) => {
        result.push({label:ent.shortName, value:ent.entId})
    })
    return result
}

const getFilterLocations = (locations) => {
    const result = [{label:'全国', value:''}]
    locations.map((city) => {
        result.push({label:city.value, value:city.id})
    })
    return result
}

const getIconName = (typeName) => {

    switch(typeName){
      case '道路桥梁':
        return 'road-bridge'
      case '地下工程':
        return 'under-engineer'
      case '海绵城市':
        return 'sponge-city'
      case '健康建筑':
        return 'health-building'
      case '绿色建筑':
        return 'green-building'
      case '绿色生产':
        return 'green-produce'
      case '清洁能源':
        return 'clean-energy'
      default:
        return 'clean-energy'
    }

  }

 export {
    getCateName,
    cateNameObj,
    getCateImg,
    getProjectItemColor,
    getGridItemColor,
    getCateUnit,
    getDateInterval,
    dateFormat,
    getFilterCategories,
    getFilterEnts,
    getFilterLocations,
    getIconName
 }