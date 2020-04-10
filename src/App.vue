<template>
  <div class="pusher">
    <div id="app" class="main container" style="min-height: 80vh;">
<!--      @include('layouts._header')-->
      <Header></Header>
      <Music></Music>
      <router-view></router-view>
<!--      @include('shared._messages')-->
<!--      @yield('content')-->
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
import './assets/js/app'
    import Header from "./components/common/Header";
    import Footer from "./components/common/Footer";
import Music from "./components/common/Music";
    export default {
        name: 'app',
        components: {Music, Footer, Header},
        data() {
            return {

            }
        },
        computed:{
            isLoading: function () {
                return this.$store.state.isLoading
            }
        },
        methods: {


        },
        created: function () {

        }
    }
</script>
<style lang="sass">
@import "./assets/sass/app.scss"
@import "./assets/ext/prism/prism.css"

</style>
