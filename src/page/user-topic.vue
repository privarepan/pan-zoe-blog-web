<template>
  <div class="ui centered grid container stackable" v-if="user">
    <!--    @include('users._left', ['_left'=> ['active'=> 'show']])-->
    <user-left :statistics="user.statistics"></user-left>
    <div class="nine wide column">
      <div class="ui segment px-3 py-3">
        <h1 class="mb-4 fw-bold">
          <i class="icon pr-1 nofloat file text outline"></i> {{user.name}} 发布的文章（{{user.statistics.topic_count}}）
          <a class="fs-large rm-link-color pull-right" target="_blank"><i class="icon newspaper"></i> 个人博客</a>
        </h1>
        <div class="ui divider"></div>
        <div class="ui feed blog-article-list rm-link-color">

          <div v-for="(item,index) in topics" :key="index" class="event">
            <div class="content">
              <div class="summary">
                <router-link :to="'/topics/'+item.id"><a class="title"> {{ item.title }} </a></router-link>
              </div>
              <div class="meta" style="line-height: 34px;">
                <div class="tags" style="margin: -2px 0px 0px;margin-bottom: -8px;">
                  <a v-for="(tag,i) in item.tag" :key="i"  class="ui label small"
                     style="margin-left: 0px !important;" target="_blank">{{tag.name}}</a>
                </div>
                <div class="date" style="font-size: 13px;margin: 7px 0em 0em;margin-left:0px">
                  <a class="item" href="" target="_blank"
                     style="width:16px;height:16px;margin-top:-3px"
                     :data-tooltip="user.name">
                    <img class="ui image display-inline-block mr-1"
                         style="width:16px;height:16px;margin-top:-3px"
                         :src="item.user.avatar"></a>
                  <span class="divider">|</span>
                  <a class="" :data-tooltip="item.created_at">创建于
                    <span> {{item.created_at_label}} </span></a>

                  <span class="divider">|</span>
                  <a>
                    阅读数 {{item.view_count}}
                  </a>
                  <span class="divider">|</span>
                  <a>
                    评论数 {{item.reply_count}}
                  </a>
                  <span class="divider">|</span>
                  <a>
                    点赞数 {{item.zan_count}}
                  </a>
                  <span class="divider">|</span>
                  <a>
                    收藏数 {{item.collect_count}}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="topics.length>0"
            background
            :page-size="parseInt(data.per_page)"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="changePage"
            :total="data.total">
          </el-pagination>
          <!--        {{ $user_topics->render() }}-->
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
        topics:[],
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
        http('user-topic/'+id,{page:this.currentPage},'GET',false).then(res =>{
          this.topics = res.data.data.data;
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

