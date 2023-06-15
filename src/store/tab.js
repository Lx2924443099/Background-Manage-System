export default {
    namespaced: "tab",
    state: {
        isCollapse: false, //控制菜单展开还是收起
        tabList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home ",
        }]
    },
    actions: {

    },
    mutations: {
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                let index = state.tabList.findIndex(item => item.name === val.name)
                if (index == -1) {
                    state.tabList.push(val)
                }
            }
        },
        deleteList(state, val) {
            state.tabList = state.tabList.filter(item => item != val)
        },
        clearTabList(state){
            state.tabList = state.tabList.splice(0,1)
        }
    },
    getters: {

    }
}