<template>
  <div class="ui threaded comments comment-list ">
    <br>
    <br>
    <br>
    <br>
    <div class="ui segment extra-padding comment-composing-box pt-3" style="padding:20px;margin-left:60px">
      <div class="reply ui message hide"></div>
      <div class="ui reply form topic-reply-form">
        <div class="ui message info">
          <i class="icon danger" aria-hidden="true"></i>
          请勿发布不友善或者负能量的内容。与人为善，比聪明更重要！
        </div>

        <div class="markdown-base">

          <mavon-editor v-model="form.content"
                        @change="change"
                        codeStyle="monokai-sublime"
                        :subfield="false"
                        :autofocus="false"
                        ref="md"
                        @imgAdd="upload"
                        :toolbars="toolbars" />
        </div>

        <div class="field rm-link-color">
          <div class="pull-left meta">
            <a href="javascript:;" class="mr-2 ui popover text-mute" data-html="黏贴或拖拽图片至输入<br>框内皆可上传图片">
              <i class="icon picture"></i>
            </a>
            <a href="javascript:;" class="mr-2 ui popover text-mute" data-html="支持除了 H1~H6 以外的<br>GitHub 兼容 Markdown">
              支持 MD
            </a>
          </div>

          <div class="pull-right">
            <button class="ui positive  labeled icon button  no-loading"
                     id="comment-composing-submit"
                     @click="comment"
            >
              <i class="icon comment"></i> 评论
            </button>
          </div>
          <div class="clearfix render">
          </div>

        </div>
      </div>

      <div class="clearfix"></div>
      <div class="box preview markdown-reply fluidbox-content" id="preview-box" style="display: none;border: dashed 1px #ccc;background: #ffffff;border-radius: 6px;box-shadow:none;margin-top: 20px;margin-bottom: 6px;"></div>
    </div>
  </div>

</template>

<script>
  import '../common/markdown-edit'
  import {http} from "../api/config";
    export default {
        name: "reply-box",
        data() {
          return {
            form:{
              content:'',
              topic_id:this.$route.params.id
            },
            toolbars: {
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              mark: true, // 标记
              superscript: true, // 上角标
              quote: true, // 引用
              ol: true, // 有序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              help: true, // 帮助
              code: true, // code
              subfield: true, // 是否需要分栏
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              /* 1.3.5 */
              undo: true, // 上一步
              trash: true, // 清空
              save: true, // 保存（触发events中的save事件）
              /* 1.4.2 */
              tabSize:4,
              navigation: true // 导航目录
            }
          }
        },
      mounted(){
          // alert(this.$route.params.id)
      },
      methods:{
          change(value,render) {
            $('.render').html(render)
            this.form.content = render;
          },
          upload(filename,file){
            let form = new FormData()
            form.append('image',file)
            let res = http('store/upload',form,'POST',true,{
               Authorization: this.$store.state.token ? this.$store.state.token.access_token : '',
               'content-type':'multipart/form-data'
            });
            res.then(res=>{
              this.$refs.md.$img2Url(filename,this.$axios.defaults.baseURL+"/storage/"+res.data.data);
            })
          },
          comment() {

            if (this.form.content.trim()) {
              const res = http('topic-reply',this.form,'POST',true);
              res.then(res=>{
                this.$emit("comment",res.data.data);
                this.form.content = '';
              })
            }
          }
        }
    }
</script>

<style scoped>
  .CodeMirror, .CodeMirror-scroll {
    min-height: 160px !important;
  }
  .markdown-base{
    margin-bottom: 1em;
  }
</style>
