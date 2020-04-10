<template>
  <div class="field" style="display: flex;flex-wrap: wrap;">
    <div class="ui left icon input">
      <i class="user secret icon"></i>
      <input id="captcha" placeholder="验证码" @input="changeInput()" v-model="captchaStr"  name="captcha" required>
    </div>
    <img class="thumbnail captcha mt-3 mb-2 ui popover"
         style="position: relative;"
         data-position="right center"
         :src="src"
         @click="generate()"
         title="点击图片重新获取验证码">
    <!--<div class="ui error message">
      <p>验证码</p>
    </div>-->
  </div>
</template>

<script>
    export default {
        name: "Captcha",
        data() {
            return {
              src:null,
              captchaStr: ''
            }
        },
        mounted() {
          this.generate();

        },
        methods:{
            captcha() {
              return this.$axios.get('//pan-zoe.testing/api/captcha');
            },
            generate() {
              this.captcha().then(res => {
                this.src = res.data.data.img;
                this.$emit('key',res.data.data.key) ;
              });
            },
            changeInput() {
              this.$emit('change-captcha', this.captchaStr)
            }

          }
    }
</script>

<style scoped>

</style>
