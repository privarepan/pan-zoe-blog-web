<template>
  <div class="js-computed-height-left four wide column pull-left sidebar clear" style="padding-right: 0px;">
    <div class="item header blog-article sidebar" style="height:auto !important;">
      <div class="ui link cards" id="user_info">
        <div class="card">
          <div class="image">
            <img src="../assets/images/public/default_avatar.jpg">
          </div>
          <div class="content">
            <div class="header">
              {{user.name}}
            </div>
            <div class="meta">
                {{user.updated_at}}
            </div>
            <div class="description">
              简介：  {{user.introduction ? user.introduction: 'Ta很神秘哦~'}}
            </div>
          </div>

          <div class="extra content">
            <button @click="star(user)" v-if="$store.state.user && $store.state.user.id !== user.id" class="ui red basic button follow fluid user_attention" data-act="follow"
                    data-id="3" type="0">
              <i class="icon plus"></i> <span class="state">{{isStar}}</span>
            </button>
            <!--<button class="ui red basic button follow fluid user_attention" data-act="follow"
                    data-id="{{ $topic->user_id }}" type="1">
              <i class="icon checkmark"></i> <span class="state">已关注</span>
            </button>-->
          </div>

          <div class="extra content">
            <a href="#" target="_blank">
              <button class="ui green basic button follow fluid">
                <i class="icon angle double right"></i> <span class="state">Ta 的主页</span>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div class="ui card link tag-active-user-card popular-card responsive">
        <div class="content">
          <span class="">文章归档</span>

          <a href="" class="rm-link-color pull-right ui popover" style="font-size: 15px;margin-right: 8px;"
             data-content="所有文章">
            <i class="icon newspaper"></i>
          </a>
        </div>
        <div class="extra content ">
          <div v-for="(item,index) in place_on_file" :key="index" class="ui list readmore" style="padding: 8px; max-height: none;">

            <a class="item" href="" style="line-height: 22px;">
              <span class=" pull-right" style="color:inherit">{{item.count}} 篇</span>
              {{item.date}}
            </a>

          </div>
        </div>
      </div>

      <div class="ui card link tag-active-user-card blog-tags responsive">
        <div class="content">
          <span class="">个人分类</span>
        </div>
        <div v-for="(item,index) in user_category" :key="index" class="ui large vertical fluid pointing menu"
             style="border-left: 0;border-right: 0;border-bottom: 0;margin-top: 0;">
          <a class="item" href="#">
            {{item.name}}
            <div class="ui small label">{{item.topic_count}}</div>
          </a>
        </div>
      </div>


      <div class="ui card link tag-active-user-card blog-tags responsive">
        <div class="content">
          <span class="">博客标签</span>
        </div>
        <div class="extra content readmore" style="padding-bottom: 18px; max-height: none;">
          <a v-for="(item,index) in tag" :key="index"class="ui label basic" href="#">
            {{item.name}}
            <div class="detail">{{item.with_tag_count}}</div>
          </a>

        </div>
      </div>

<!--      <div class="ui sticky doc toc">-->
<!--        <div class="ui card column author-box grid  tocify" id="markdown-tocify"-->
<!--             style="max-height: 100%;padding: 22px 4px;">-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>

</template>

<script>
    import {http} from "../api/config";

    export default {
        name: "Sidebar",
        data(){
          return {
            is_star:true,
          }
        },
        props: [
          'user','tag','place_on_file','user_category'
        ],
        created() {
          if (this.$store.state.user){
             http(`user/${this.$store.state.user.id}/star/${this.user.id}`,null,'GET')
            .then(res=>{
              if (res.data.data) {
                this.is_star = true;
              }else{
                this.is_star = false
              }
            }).catch(res=>{
              this.is_star = true
            })
          }else{
            this.is_star = true
          }
          // console.log(this.)
        },
      computed:{
        isStar() {
          return this.is_star ? '已关注' : '关注';
        }
      },
       methods:{
         star(user) {
            http('user-star/'+user.id,null,'PUT').then(res=>{
              if (res.data.data){
                this.is_star = true
                // this.$notify.success('关注成功')
              }else {
                this.is_star = false
              }
            })
         }
       }
    }
</script>
