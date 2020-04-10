<template>
  <div class="ui middle aligned center aligned grid column-max-width-500">
    <div class="column">
      <h2 class="ui green header">
        <div class="content">
          注册账号
        </div>
      </h2>
      <div class="ui large form error">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input id="name" type="text"
                     placeholder="姓名"
                     v-model="form.name"
                     name="name" required autofocus>
            </div>
            <!--<div class="ui error message" v-if="">
              <p>姓名</p>
            </div>-->
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="envelope icon"></i>
              <input id="email" type="email"
                     placeholder="邮箱"
                     v-model="form.email"
                     name="email" value="" required>
            </div>
            <!--<div class="ui error message">
              <p>email</p>
            </div>-->
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input id="password" type="password"
                     placeholder="密码"
                     v-model="form.password"
                     name="password" required>
            </div>
            <!--<div class="ui error message">
              <p>密码错误</p>
            </div>-->
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input id="password-confirm" type="password" class="form-control"
                     placeholder="确认密码"
                     v-model="form.password_confirmation"
                     name="password_confirmation" required>
            </div>
          </div>
          <Captcha @change-captcha="changeCaptcha" @key="changeKey"></Captcha>
          <button class="ui fluid large green button" @click="register">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Captcha from "../components/common/Captcha";
  export default {
    name: "login",
    components: {Captcha},
    data(){
        return {
            form:{
              name:'',
              email:'',
              password:'',
              password_confirmation:'',
              captcha:'',
              key:'',
            }
        }
    },
    methods:{
      register(){
        const res = this.$axios.post('//pan-zoe.testing/api/register',this.form);
        res.then(this.success).catch(this.fail)
      },
      changeKey(key) {
        this.form.key = key;
      },
      changeCaptcha(str) {
        this.form.captcha = str;
      },
      success(res) {
        this.$router.push({name:'login'});
      },
      fail(res) {
        this.$notify.error({
          title: '验证错误',
          message: res.data.message
        });
      },
    }
  }
</script>

<style scoped>

</style>
