import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                vedioData: [
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1500
                    },
                    {
                        name: 'oppo',
                        value: 1200
                    },
                    {
                        name: '魅族',
                        value: 2200
                    }
                ],
                userData: [
                    {
                        data: '周一',
                        new: 60,
                        active: 550
                    },
                    {
                        data: '周二',
                        new: 79,
                        active: 450
                    },
                    {
                        data: '周三',
                        new: 126,
                        active: 740
                    },
                    {
                        data: '周四',
                        new: 66,
                        active: 490
                    },
                    {
                        data: '周五',
                        new: 22,
                        active: 150
                    },
                    {
                        data: '周六',
                        new: 56,
                        active: 600
                    },
                    {
                        data: '周日',
                        new: 82,
                        active: 750
                    },
                ],
                orderData: {
                    data: ["20191001", "20191002", "20191003", "20191004", "20191005", "20191006", "20191007"],
                    data: List
                },
                tableData:
                    [
                        {
                            name: "苹果",
                            todayBuy: 100,
                            monthBuy: 300,
                            totalBuy: 800,
                        },
                        {
                            name: "小米",
                            todayBuy: 100,
                            monthBuy: 300,
                            totalBuy: 800,
                        },
                        {
                            name: "三星",
                            todayBuy: 100,
                            monthBuy: 300,
                            totalBuy: 800,
                        },
                        {
                            name: "魅族",
                            todayBuy: 100,
                            monthBuy: 300,
                            totalBuy: 800,
                        },
                        {
                            name: "VIVO",
                            todayBuy: 100,
                            monthBuy: 300,
                            totalBuy: 800,
                        },
                    ]
            }
        }
    }
}