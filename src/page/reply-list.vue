<template>
  <div>
    <div id="replies" name="replies"></div>
    <div class="ui threaded comments comment-list">
      <br>
      <div class="ui divider horizontal grey">
        <i class="icon comments"></i> 讨论数量: <span class="reply-count">{{topic.reply_count}}</span>
      </div>

      <div class="comments-feed">
        <div v-for="(item,index) in topic.reply" :key="index" class="comment">
          <div class="avatar">
            <a href="#">
              <img class="lazy" src="../assets/images/public/default_avatar.jpg" alt="">
              <!--             <img class="lazy" data-original="{{ asset('images/public/default_avatar.jpg') }}">-->
            </a>
          </div>
          <div class="content">
            <div class="comment-header">
              <div class="meta">
                <a class="author" href="#" v-if="item.user">
                  {{item.user.name}}
                </a>
              </div>
            </div>


            <div class="text comment-body markdown-reply fluidbox-content">
              <div class="px-3">
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

            <div class=""
                 style="background: #fff;padding: 15px;font-size: 12px;padding-top:0;color: rgba(0, 0, 0, 0.4);">
              <i class="icon clock"></i> {{item.created_at_label}}
            </div>

            <div class="footer">
              <div class="ui menu reactions">

                 <a class="item ui " style="color:rgba(0, 0, 0, 0.4);font-size: 0.9em;" href="#">
                     <i class="icon edit" style="margin: 0;width: 1em;"></i>
                </a>

                <a class="item ui " style="cursor: pointer;"
                   href="javascript:;"
                   axios-method="delete"
                   data-url="#">
                  <i class="icon trash" style="margin: 0;width: 1em;color:rgba(0, 0, 0, 0.4);font-size: 0.9em;"></i>
                </a>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import {http} from "../api/config";

  export default {
    name: "reply-list",
    props:[
      'topic'
    ],
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
    data() {
      return {
        // comment:null,
      }
    },
    mounted() {
      /*const res = http('topic-comment/'+this.$route.params.id);
      res.then(res => {
          this.comment = res.data.data;
      });*/

    }
  }
</script>

<style scoped>

</style>
