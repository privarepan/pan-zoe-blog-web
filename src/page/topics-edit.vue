<template>
  <div class="ui centered grid container stackable">
    <div class="twelve wide column">
      <div class="ui segment">
        <a class="ui right corner label compose-help" href="javascript:;">
          <i class="info icon"></i>
        </a>

        <div class="content extra-padding">

          <div class="ui header text-center text gery" style="margin:10px 0 40px">
            <i class="icon paint brush"></i>
            编辑博文
          </div>
          <div id="article-create-form"
                style="min-height: 50px;"
                class="ui form">


            <div class="field">
              <label for="">标题</label>
              <input class="form-control" type="text" name="title"
                     id="title-field" v-model="form.title"
                     placeholder="请填写标题" required="">
            </div>

            <div class="field">
              <label>分类</label>
              <div class="field">
                <div class="ui selection dropdown option2">

                  <i class="dropdown icon"></i>
                  <div class="default text">请选择分类标签（必选）</div>
                  <div class="menu">

                    <div v-for="(item,index) in category" :key="index" :data-value="item.id" class="item">
                      {{item.name}}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <label>选择标签（Tab 键可创建新标签）</label>
              <div class="ui search multiple selection tags dropdown option1" >

                <i class="dropdown icon"></i>
                <input type="text" class="search">
                <div class="default text">请选择标签（选填）</div>
                <div class="menu">

                  <div v-for="(item,index) in category" :key="index" class="item">
                    {{item.name}}
                  </div>

                </div>
              </div>
            </div>

            <div class="markdown-base">
              <mavon-editor v-model="form.body"
                            style="z-index: 0"
                            @change="change"
                            codeStyle="monokai-sublime"
                            :subfield="false"
                            :autofocus="false"
                            ref="md"
                            @imgAdd="upload"
                            :toolbars="toolbars" />
            </div>

            <div class="ui segment private-checkbox">
              <div class="field">
                <div class="ui toggle checkbox">
                  <input type="checkbox" id="pasteFromClickBoard" name="pasteFromClickBoard" tabindex="0" class="hidden" value="yes">
                  <label>剪贴板内容格式化 Markdown</label>
                </div>
              </div>
            </div>

            <div contenteditable="true" id="pastebin"></div>

            <div class="ui message">
              <button @click="comment" class="ui button green publish-btn loading-on-clicked" id="">
                <i class="icon send"></i>
                发布文章
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>





</template>

<script>
    import Sidebar from "./Sidebar";
    import ReplyList from "./reply-list";
    import ReplyBox from "./reply-box";
    import {http} from "../api/config";
    import $ from 'jquery'

    export default {
        name: "TopicsEdit",

        data(){
          return {
            topic:null,
            category:[],
            form:{
              title:'',
              body:'',
              category_id:'',
              tag:null,
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
       async created(){
          let id = this.$route.params.id
          let res = http('category','','GET',false);
          res.then(res=>{
            this.category = res.data.data
          })

      },
      mounted(){
        $('.ui.dropdown')
          .dropdown({
            allowAdditions: true,
            maxSelections: 3
          });
        let id = this.$route.params.id
        http('topic/'+id,'','GET',false).then(res=>{
          let topic = res.data.data;
          this.topic = topic
          this.form.title = topic.title;
          this.form.body = topic.body;
          $('.option2').dropdown('set selected',[this.topic.category_id])
          let arr = [];
          this.topic.tag.forEach(function (item,index) {
            arr[index] = item.name;
          });
          if (arr.length > 0) {
            $('.option1').dropdown('set selected',arr)
          }
        })
    },
      methods: {
        comment() {
          var value = $('.option1')
            .dropdown('get value');
          var value2 = $('.option2')
            .dropdown('get value');
          this.form.category_id = value2
          this.form.tag = value.split(',')
          let res = http('topic',this.form,'POST');
          res.then(res=>{
            this.$notify.success('发布成功');
            this.$router.push('/home')
          }).catch(res=>{
            this.$notify.warning(res.data.message)
          })
        },
        change(value,render) {

          // this.form.content = render;
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
      }
    }
</script>

<style scoped>
</style>
