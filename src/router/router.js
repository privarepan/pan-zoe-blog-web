import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login'
import Home from "../page/Home";
import Topics from "../page/Topics";
import register from "../page/register";
import About from "../page/About";
import Books from "../page/Books";
import Book from "../page/Book";
import Article from "../page/Article";
import Dashboard from "../page/Dashboard"
import UserInfo from "../page/user-info"
import TopicsCreate from "../page/topics-create"
import TopicsEdit from "../page/topics-edit"
import notification from "../page/notification";
import userTopic from "../page/user-topic"
import userReply from "../page/user-reply"
import userCollect from "../page/user-collect"
import userZan from "../page/user-zan"
import userStar from "../page/user-star"
import userFans from "../page/user-fans"

Vue.use(Router)

const router = new Router({
    mode: 'history',     //这个模式下，地址栏就不会自己加上#号了
    routes: [
        {
            name:"Home",
            path:"/home",
            component: Home,
        },
        {
            name: 'login',
            path: '/login',
            component: login,
        },
        {
            name:'register',
            path:'/register',
            component:register
        },
        {
            name:'Topics',
            path:'/topics/:id?',
            component : Topics
        },
        {
            name: 'about',
            path: '/about',
            component: About
        },
        {
          name: 'books',
          path: '/books',
          component: Books
        },
        {
          name: 'book',
          path: '/book',
          component: Book
        },
        {
          name: 'article',
          path: '/article',
          component: Article
        },
        {
          name: 'dashboard',
          path: '/dashboard',
          component: Dashboard
        },
        {
          name:'user-info',
          path:'/user-info/:id',
          component:UserInfo,
        },
        {
          name:'topics-create',
          path:'/topics-create',
          component:TopicsCreate
        },
        {
          name:'topics-edit',
          path:'/topics-edit/:id',
          component:TopicsEdit
        },
        {
          name:'notification',
          path:'/notification',
          component:notification
        },
        {
          name:'user-topic',
          path:'/user-topic/:id',
          component:userTopic
        },
        {
          name:'user-reply',
          path:'/user-reply/:id',
          component:userReply
        },
        {
          name:'user-collect',
          path:'/user-collect/:id',
          component:userCollect
        },
        {
          name:'user-zan',
          path:'/user-zan/:id',
          component:userZan
        },
        {
          name:'user-star',
          path:'/user-star/:id',
          component:userStar
        },
        {
          name:'user-fans',
          path:'/user-fans/:id',
          component:userFans
        }
    ]
})

//利用vue-router2.2.0新增特性addRoutes实现路由动态加载，菜单动态加载，运用于后台管理系统，路由数据取自数据库
// let arr = []
// defaultMenu.forEach(item => {
//     item.child.forEach(row => {
//         //根据后台返回的url，这里加载对于的route
//         routeFile.forEach(route => {
//             if (row.url === route.path) {
//                 arr.push(route)
//             }
//         })
//     })
// })



// router.addRoutes(baseRoute)

export default router
