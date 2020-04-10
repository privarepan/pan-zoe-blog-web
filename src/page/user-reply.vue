<template>
  <div class="ui centered grid container stackable" v-if="user">
    <!--    @include('users._left', ['_left'=> ['active'=> 'show']])-->
    <user-left :statistics="user.statistics"></user-left>
    <div class="nine wide column">

      <div class="ui segment px-3 py-3">
        <h1 class="mb-4 fw-bold">
          <i class="icon pr-1 nofloat comment outline"></i> {{user.name}} 的所有回复（{{user.statistics.reply_count}}）
        </h1>
        <div class="ui divider"></div>
        <div class="ui feed">
          <div v-for="(item,index) in replies" :key="index" class="event mt-4 mb-1 display-block">
            <div class="content">
              <a class="ui ribbon green basic label mb-4" style="margin-left: -8px;"
                 href="p?#reply1" target="_blank">
                评论于 <span :title="item.created_at">{{item.created_at_label}}</span>
              </a>
              <div class="summary">

                <a href="p?#reply1" target="_blank"
                   :title="item.topic.title"
                   class="remove-padding-left  rm-link-color">
                  {{ item.topic.title }}
                </a>
              </div>

              <div class="reply-body markdown-reply content-body px-2 pt-2">
                <p><mavon-editor
                  class="md"
                  :value="item.body"
                  codeStyle="monokai-sublime"
                  :subfield = "prop.subfield"
                  :defaultOpen = "prop.defaultOpen"
                  :toolbarsFlag = "prop.toolbarsFlag"
                  :editable="prop.editable"
                ></mavon-editor></p>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="replies.length>0"
            background
            :page-size="parseInt(data.per_page)"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="changePage"
            :total="data.total">
          </el-pagination>
<!--          {{ $user_replies->render() }}-->

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
    name: "userReply",
    components: {UserRight, UserLeft},
    data(){
      return {
        replies:[],
        user:null,
        currentPage:1,
        data:null
      }
    },
    computed: {
      prop () {
        let data = {
          subfield: false,// 单双栏模式
          defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
          editable: false,
          toolbarsFlag: false,
        }
        return data
      }
    },
    watch:{
      '$route'(to,from){
        if (to.name === 'user-reply'){
         this.init();
        }
      }
    },
    methods:{
      changePage(page) {
        const id = this.$route.params.id
        this.$router.push('/user-reply/'+id+'?page='+page);
      },
      init(){
        const id = this.$route.params.id
        if (this.$route.query.page !== undefined) {
          this.currentPage = parseInt(this.$route.query.page);
        }
        http('user-reply/'+id,{page:this.currentPage},'GET',false).then(res =>{
          this.replies = res.data.data.data;
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



