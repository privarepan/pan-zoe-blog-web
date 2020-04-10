<template>
  <nav class="ui main borderless menu top stackable" id="topnav">

    <div class="ui container">
      <router-link to="/home">
        <a href="#" class="item secondary">
        <h2 style="color: green;">Pan Zoe</h2>
       </a>
      </router-link>
      <router-link to="/home">
        <a href="#" class="item secondary">
          博客
        </a>
      </router-link>
      <div class="ui simple item dropdown article stackable nav-user-item  secondary">
        教程 <i class="dropdown icon"></i>
        <div class="ui menu stackable">
          <router-link to="/books">
            <a class="item" href="#">
              <i class="icon warehouse"></i>全部教程
            </a>
          </router-link>


          <a href="#" class="item">
            <i class="icon book"></i> nginx
          </a>

        </div>
      </div>
      <router-link to="/about">
        <a href="#" class="item secondary">
          关于本站
        </a>
      </router-link>


      <form id="header-search-app" @click="click" class="ui fluid category search item secondary"
            data-api="#"
            action="#" method="GET">
        <div class="ui icon input" :class="{'loading' : false}">
          <select class="ui compact selection dropdown header-search-left"
                  v-model="form.search_type"
                  id="header-search-left"
                  name="search_type">
            <option value="is_topic" selected="selected">文章</option>
<!--            <option value="is_user">用户</option>-->
          </select>
          <input class="prompt header-search-right"
                 type="text"
                 placeholder="搜索"
                 @input.stop="search($event)" @focus.stop="search($event)"
                 autocomplete="off"
                 v-model="form.content"
                 name="q">
          <i class="search icon"></i>
        </div>
        <div class="results transition"
             :class="{visible:search_blog_results.length}"
             id="search-results">
          <a class="result" v-for="item in search_blog_results">
            <router-link :to="'/topics/'+item.id">
            <div class="content">
              <div class="title" v-text="item.title"></div>
<!--              <div class="description" v-text="item.excerpt"></div>-->
            </div>
            </router-link>
          </a>
<!--          <a href="#" class="action"><i class="icon search"></i>搜全站(回车)</a>-->
        </div>

        <!--<div class="results transition"
             :class="{ visible:  search_user_results.length && search_user_has_results }"
             id="search-results">
          <a class="result" v-for="item in search_user_results" :href="item.href">
            <div class="content">
              <div class="title" v-text="item.name"></div>
              <div class="description" v-text="item.introduction"></div>
            </div>
          </a>
          <a :href="search_all_url" class="action"><i class="icon search"></i>搜全站(回车)</a>
        </div>-->
      </form>

      <div class=" right menu stackable secondary">

        <div v-if="!this.$store.state.user" class="item rm-link-color">
          <router-link to="/login"><a class="mr-4 no-pjax login_required"><i class="icon sign in "></i> 登录</a></router-link>
          <router-link to="/register">
            <a class="no-pjax" href="#" style="margin-left: 10px;"><i
              class="icon user add "></i> 注册 </a>
          </router-link>
        </div>

        <div v-if="this.$store.state.user" class="ui simple item dropdown article stackable nav-user-item  secondary" tabindex="0">
          <i class="icon paint brush"></i> <i class="dropdown icon"></i>
          <div class="ui menu stackable" tabindex="-1">
            <router-link to="/topics-create"><a href="#" class="item no-pjax">
              <i class="icon paint brush"></i> 新建博文
            </a>
            </router-link>

<!--            <a href="#" class="item no-pjax">-->
<!--              <i class="icon paper plane"></i> 新建教程-->
<!--            </a>-->

          </div>
        </div>
        <!--<a v-if="this.$store.state.user" class="item" href="#" title="消息通知">
                <router-link to="/notification">
                  <span
                  class="basic ui circular label notification"
                  id="notification-count">
                    2
                </span>
                </router-link>
        </a>-->

        <div v-if="this.$store.state.user" class="ui simple item dropdown article stackable nav-user-item" tabindex="0">
          <img class="ui avatar image lazy"
               src="../../assets/images/public/default_avatar.jpg">
          &nbsp;

          <i class="dropdown icon"></i>
          <div class="ui menu stackable" tabindex="-1">

            <router-link :to="/user-info/+this.$store.state.user.id">
            <a href="#" class="item">
              <i class="icon user"></i>
              个人中心
            </a>
            </router-link>
            <a href="#" class="item">
              <i class="icon settings"></i>
              编辑资料
            </a>

            <a class="item no-pjax" href="javascript:void(0)"
               data-prompt="您确定要退出登录吗？"
               title="退出登录" style="cursor: pointer;"
               @click="logout">
              <i class="icon sign out"></i>
              退出
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {http} from "../../api/config";
  import {user} from "../../api/api";

  export default {
        name: "Header",
    // 重新定义分解符
    delimiters: ['<{', '}>'],
    data() {
          return {
            timmer: null,
            loading: false,
            // 提交数据
            form: {
              search_type: 'is_topic',
              content: ''
            },
            // 全局搜索
            search_all_url: '',
            // 搜索结果
            search_blog_results: [],
            search_user_results: [],
            // 无搜索结果
            search_blog_has_results: false,
            search_user_has_results: false,
          }
    },
    watch:{
      '$route'(to,from){
        if (to.name === 'Topics'){
          this.search_blog_results = [];
        }
      }
    },
    mounted() {
      // 初始化搜索值
       $(".ui.dropdown").dropdown();
      // const token = this.$store.state.token;
    },
    methods: {
      logout() {
        http('logout',null,'POST').then(res=>{
          this.$store.commit("setUser",null);
          this.$store.commit("setToken",null);
          this.user = null;
          this.$router.push('/home');
        })
      },
      search($event) {
        this.timmer && clearTimeout(this.timmer);
        this.timmer = setTimeout(() => {
          clearTimeout(this.timmer);
          // todo
          // this.search_all_url = form.serialize();
          if ($.trim(this.form.content) != ''){
            this.loading = true;
            const search = http('topic',{content:this.form.content},'GET',false);
            search.then(res=>{

              if (!res.data.data.topics.data.length) {
                this.search_blog_has_results = false;
                this.search_user_has_results = false;
              } else {
                  this.search_blog_results = res.data.data.topics.data
                  this.search_blog_has_results = true;
                  this.search_user_has_results = false;
              }
              this.loading = false;
            });
          } else {
            this.search_user_has_results = false;
            this.search_blog_has_results = false;
            this.loading = false;
          }
        }, 200)
      },
      click() {
        // self.search_blog_has_results = false;
        // self.search_user_has_results = false;
        // self.loading = false;
        this.search_blog_results = []
      },

    }
  }

</script>


