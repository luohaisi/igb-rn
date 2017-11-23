

login = {
    token: 'xxxxx',
    userId: 'xxxx', 			//用户ID
    entName: '上海城建物资有限公司',        	//用户所属企业名称
    entId: 'xxx',				//用户所属企业ID
    subEnts: [{				//子企业列表
        entName: 'xxx',        
        entId: 'xxx',	
        shortName: 'xxx',		
    }],
    statCategories: [{
        name: 'xxx',
        statCateId: 'xxx',
        children: 'xxx',
    }],
    locations: [{}]
}

overview = {
    projectStat: [
        {
            display: '项目总数',
            countStr: 110
        },{
            display: '进行中',
            countStr:  120
        }, {
            display: '已结束',
            countStr:  120
        }
    ],
    totalAmountStr: '2,300,100.00元',		//总金额
    amountOfCate: [
        {
            cateName: '混凝土',
            amountStr: '12,000'
        },
        {
            cateName: '其他',
            amountStr: '30,000'
        }
    ],
    groupByEnt:[{
        entName: '城建物资',
        purchaseAmount: '12313',				//采购金额
        piCount: 	'123122122'					//项目数
    }],	
    entAxis: {									//企业统计坐标轴 (待定,暂不开发)
        purchaseAmount: {
            min: '12333',
            max: '16666'
        },
        piCount: {
            min: '123122',
            max: '16666'
        }
    }
}


module.exports = {
    login: login,
    overview: overview
  }