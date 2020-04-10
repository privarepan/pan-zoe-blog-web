<template>
  <div v-if="topic" id="over" class="ui centered grid container main stackable blog">
    <div class="js-computed-height-right twelve wide column  main main-column">
      <div class="ui segment article-content">
        <div class="right ui rail hide-on-mobile">
          <div class="ui sticky topic-operation">
            <div class="ui vertical icon menu border-0">
              <a class="item text-mute ui action topic-vote popover rm-link-color text-mute"
                 data-position="left center"
                 id="article-vote"
                 href="javascript:;"
                 data-html="点赞">
                <i class="thumbs up icon fs-large"
                   :class="{active:topic.is_zan}"
                   @click="zan"
                   topic_id="1"></i>
                <span
                  class="count vote-count fs-small mt-2 display-inline-block">{{topic.zan_count}}</span>
              </a>

              <a class="item text-mute ui action collect popover rm-link-color text-mute"
                 data-position="left center"
                 id="article-collection"
                 href="javascript:;"
                 @click="collect"
                 data-html="收藏">
                <i class="heart icon fs-large"
                   :class="{active:topic.is_collect}"
                   topic_id="1"></i>
                <span
                  class="count vote-count fs-small mt-2 display-inline-block">{{topic.collect_count}}</span>
              </a>

              <a class="item text-mute ui action  popover rm-link-color text-mute"
                 data-position="left center"
                 href="#replies"
                 onclick="scrollToAnchor('replies')" title="评论">
                <i class="comments icon fs-large"></i>
                <span class="fs-small mt-2 display-inline-block">{{topic.reply_count}}</span>
              </a>

              <a class="item ui   popover rm-link-color text-mute"
                 data-position="left center" href="#topnav"
                 onclick="scrollToAnchor('topnav')" title="返回顶部">
                <i class="angle double up icon fs-large fw-bold"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="extra-padding" style="padding-bottom:4px">
          <h1 style="margin-bottom: 15px;">
            <span style="line-height: 34px;">{{topic.title}}</span>
          </h1>

          <div class="book-article-meta" style="margin-bottom: 10px;">
            <i class="icon folder outline"></i>
            <a class="" data-inverted="" data-tooltip="分类:文章">
              {{topic.category.name}}
            </a>
            <span class="divider">/</span>
            <i class="icon time outline"></i>
            <a class="" data-inverted="" :data-tooltip="topic.created_at">
              创建于 <span>{{topic.created_at_label}}</span>
            </a>

            <span class="divider">/</span>
            <i class="icon eye open"></i>
            <a>阅读数 {{topic.view_count}}</a>

            <span class="divider">/</span>
            <i class="icon comments outline"></i>
            <a>评论数 {{topic.reply_count}}</a>
            <span class="divider">/</span>
            <span v-if="$store.state.user && topic.user_id === $store.state.user.id" style="font-size: 13px;color: #adb1af;">
                            （
                            <router-link :to="'/topics-edit/'+topic.id"><a href="#"><i class="icon edit"></i>编辑</a></router-link>
                            <span class="divider">|</span>
                            <a class="top-admin-operation ml-0"
                               href="javascript:;"
                               @click="del"
                               data-url="" style="cursor: pointer;">
                                <i class=" trash icon"></i>删除
                            </a>
                            ）
                        </span>
          </div>

          <div class="ui divider"></div>
          <mavon-editor
            class="md"
            :value="topic.body"
            style="z-index: 0"
            :subfield = "prop.subfield"
            :defaultOpen = "prop.defaultOpen"
            :toolbarsFlag = "prop.toolbarsFlag"
            :editable="prop.editable"
          ></mavon-editor>
        </div>
      </div>

<!--      @include('topics._reply_list')-->
      <reply-list :topic="topic" ></reply-list>
      <reply-box @comment="comment"></reply-box>
<!--      @includeWhen(\Illuminate\Support\Facades\Auth::check(), 'topics._reply_box')-->
    </div>
    <Sidebar v-if="topic.user"
             :user="topic.user"
             :tag="topic.tag"
             :place_on_file="topic.place_on_file"
             :user_category="topic.user_category"
    ></Sidebar>
<!--    @include('topics._sidebar', ['sidebar_data'=> $sidebar_data])-->
  </div>
</template>

<script>
    import Sidebar from "./Sidebar";
    import ReplyList from "./reply-list";
    import ReplyBox from "./reply-box";
    import {http} from "../api/config";

    export default {
        name: "Topics",
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
        data(){
          return {
            topic:null,
          }
        },
      watch:{
        '$route'(to,from){
          if (to.name === 'Topics'){
            let id = this.$route.params.id;
            http('topic/'+id).then(res =>{
              this.topic = res.data.data
            });
          }
        }
      },
        components: {ReplyBox, ReplyList, Sidebar},
        async mounted() {
          let id = this.$route.params.id;
          await http('topic/'+id).then(res =>{
            this.topic = res.data.data
          });
        },
      methods: {
        comment(msg) {
          this.topic.reply.push(msg);
          this.topic.user_count.reply_count++;
        },
        collect() {
          let id = this.$route.params.id;
          const res = http('user-collect/'+id,'','PUT',true);
          res.then(res=>{
            if (res.data.data){
              this.topic.collect_count++;
              this.topic.is_collect = 1;
            }else{
              this.topic.collect_count--;
              this.topic.is_collect = 0;
            }
          })
        },
        zan() {
          let id = this.$route.params.id;
          const res = http('zan-topic/'+id,'','PUT',true);
          res.then(res=>{
            if (res.data.data){
              this.topic.zan_count++;
              this.topic.is_zan = 1;
            }else{
              this.topic.zan_count--;
              this.topic.is_zan = 0;
            }
          })
        },
        del(){
          let id = this.$route.params.id;
          const res = http('topic/'+id,'','DELETE',true);
          res.then(res=>{
            this.$notify.success('删除成功');
          }).catch(res=>{
            this.$notify.error(res.data.message);
          })
        },
      }
    }
</script>

<style scoped>
  #over{
    /*overflow: visible;*/
    /*overflow-x: hidden;*/
    /*overflow-y: hidden;*/
  }
  .blog.grid.container.main {
    display: block;
  }

  .blog.grid.container.main .sidebar {
    font-size: 14px;
    padding-right: 6px;
  }

  .ui.top.menu {
    margin-bottom: 30px;
  }

  .tocify-header {
    padding: 0 !important;
  }
</style>
