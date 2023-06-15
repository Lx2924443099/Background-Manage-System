import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Home from "../views/Home"
import User from "../views/User"
import Main from "../views/Main"
import Mail from "../views/Mail"
import PageOne from "../views/PageOne"
import PageTwo from "../views/PageTwo"
import Login from "../views/Login"
import Cookie from 'js-cookie'

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: Main,
            redirect: "/home",
            children: [
                {
                    path: "home",
                    name: 'home',
                    component: Home
                },
                {
                    path: "user",
                    name: 'user',
                    component: User,
                    beforeEnter:(to,from,next)=>{
                        let token = JSON.parse(Cookie.get("token"))
                        let access = token.access
                        if (access == "超级管理员") {
                            next()
                        }else{
                            next("/home")
                        }
                    }
                },
                {
                    path: "mail",
                    name: 'mail',
                    component: Mail
                },
                {
                    path: "page1",
                    name: 'page1',
                    component: PageOne
                },
                {
                    path: "page2",
                    name: 'page2',
                    component: PageTwo
                }
            ]
        },
        {
            name: 'Login',
            path: '/login',
            component: Login
        }
    ]
})
