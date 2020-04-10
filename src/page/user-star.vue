<template>
  <div class="ui centered grid container stackable" v-if="user">
    <!--    @include('users._left', ['_left'=> ['active'=> 'show']])-->
    <user-left :statistics="user.statistics"></user-left>
    <div class="nine wide column">
      <div class="ui segment px-3 py-3">
        <h1 class="mb-4 fw-bold">
          <i class="icon pr-1 nofloat comment outline"></i>
          关注用户
          （{{ user.statistics.star_count }}）
        </h1>
        <div class="ui divider"></div>
        <div class="ui divided items">
          <div v-for="(item,index) in star" class="item">
            <div class="ui image image-55 ">
              <router-link :to="'/user-info/'+item.star.id">
                <a  target="_blank" class="">
                <img class="image-border" :src="item.star.avatar">
                </a>
              </router-link>
            </div>
            <div class="middle aligned content">
              <h4><router-link :to="'/user-info/'+item.star.id"><a target="_blank">{{ item.star.name }}</a></router-link></h4>
              <div>
                {{ item.star.introduction }}
              </div>
            </div>
          </div>
          <el-pagination
            v-if="star.length>0"
            background
            :page-size="parseInt(data.per_page)"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="changePage"
            :total="data.total">
          </el-pagination>
<!--          {{ $follow_fans->render() }}-->
        </div>
      </div>
    </div>

    <user-right :user="user"></user-right>
  </div>
</template>

<script>
  import {http} from "../api/config";
  import UserLeft from "./user-left";
  import UserRight from "./user-right";

  export default {
    name: "userTopic",
    components: {UserRight, UserLeft},
    data(){
      return {
        star:[],
        user:null,
        currentPage:1,
        data:null
      }
    },
    watch:{
      '$route'(to,from){
        if (to.name === 'user-topic'){
          this.init();
        }
      }
    },
    methods:{
      changePage(page) {
        const id = this.$route.params.id
        this.$router.push('/user-topic/'+id+'?page='+page);
      },
      init(){
        const id = this.$route.params.id
        if (this.$route.query.page !== undefined) {
          this.currentPage = parseInt(this.$route.query.page);
        }
        http('user-star/'+id,{page:this.currentPage},'GET',false).then(res =>{
          this.star = res.data.data.data;
          this.data = res.data.data;
        })
        http('user/'+id,null,'GET',false).then(res => {
          this.user = res.data.data;
        })
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style scoped>

</style>


