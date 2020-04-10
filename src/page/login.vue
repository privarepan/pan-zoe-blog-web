<template>
  <div class="ui middle aligned center aligned grid column-max-width-500">
    <div class="column">
      <h2 class="ui green header">
        <div class="content">
          登录
        </div>
      </h2>
      <div class="ui large form error" method="post" action="">
        <div class="ui stacked segment">
          <div class="field">
            <!--<div class="ui error message">
              <p>方法</p>
            </div>-->
            <!--<div class="ui error message">
              <p>pass</p>
            </div>-->
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="email" name="email" v-model="form.email" placeholder="请输入您的邮箱" value="" required autofocus>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="form.password" placeholder="请输入您的密码" required>
            </div>
          </div>
          <div class="field" style="display: flex;">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" name="remember" id="remember">
              <label for="remember">记住我</label>
            </div>
          </div>
          <button class="ui fluid large green button" @click="login">登录</button>
                             <!-- <div class="field" style="display: flex;padding-top: 10px;justify-content: center;">
                                      <a class="btn btn-link" href="#">
                                           忘记密码？
                                      </a>
                             </div>-->
        </div>

        <div class="ui error message"></div>

      </div>

      <div class="ui message">
        创建一个用户? <router-link to="/register"><a href="#">注册</a></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import store from "../vuex/store";
  import {login,user} from '../api/api'
  const commonUtil = require('../assets/util/common')
  export default {
    name: "login",
    data(){
        return {
            form:{
              email:'',
              password:''
            }
        }
    },
    created() {
      user().then(res=>{
        this.$store.commit('setUser',res.data.data);
        this.$router.push('/home');
      });
    },
    methods:{
      async login(){
          const res = login(this.form);
          await res.then(res=>{
            this.$store.commit('setToken', res.data.data);
          });
          await user().then(res=>{
            this.$store.commit('setUser',res.data.data);
          });
        this.$router.push('/home')

      },

    }
  }
</script>

<style scoped>

</style>
