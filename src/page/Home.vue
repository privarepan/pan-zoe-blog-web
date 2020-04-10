<template>
  <div class="ui centered grid container main stackable blog" style="">
    <div class="twelve wide column pull-right main" style="margin-bottom: 3rem;">
      <div class="ui segment article-content">
        <div class="extra-padding">
          <h1>
            <i class="icon newspaper"></i>
<!--            分类：<code class="search-keyword">12 </code>-->
<!--            标签：<code class="search-keyword">23 </code>-->
            所有文章
            <div class="ui secondary menu pull-right small" style="margin-top: -4px;">
              <div class="ui item" style="font-size:13px;padding: 0px 4px;color: #777;">
                文章排序：
              </div>
              <a class="ui item popover vote}"
                 data-content="按照时间排序"
                 href="#?order=recent" role="button">时间</a>
              <a class="ui item  popover vote"
                 data-content="按照投票排序"
                 href="#?order=vote" role="button">投票</a>
            </div>
          </h1>

          <div class="ui divider"></div>
          <div class="ui feed topic-list rm-link-color mt-0" v-for="(item,index) in topics" :key="item.id">
            <div class="event pt-3 pb-0 mb-0">
              <div class="label mt-1" style="width: 3.2em;">
                <a href="">
                  <img class="lazy" :src="src" alt=""
                       style="border: 1px solid #ddd;padding: 2px;">
                </a>
              </div>
              <div class="content ml-3">
                <div class="summary " style="color: #555;">
                  <router-link :to="'/topics/'+item.id">{{item.title}}</router-link>
                  <a href="#" v-for="(value,index1) in item.tag" title="title" class="title" :key="value.id">
                    {{value.name}} &nbsp;
                  </a>
                </div>
                <div class="meta mt-2 mb-2">
                  <div class="date" style="font-size: 13px;margin: 7px 0 0 0;">
                    <router-link :to="item.category ? '/category/'+item.category.id:''">
                    <a href="#"
                       data-tooltip="分类"
                       title="名称">
                      <i class="icon folder outline"></i> {{item.category ? item.category.name:''}}
                    </a>
                    </router-link>
                    <span class="divider">|</span>
                    <a class="" :data-tooltip="item.created_at">
                      发布于 <span :title="item.created_at">{{item.created_at}}</span>
                    </a>
                    <span class="divider">|</span>
                    <a>
                      阅读 {{item.view_count}}
                    </a>
                    <span class="divider">|</span>
                    <a>
                      评论 {{item.reply_count}}
                    </a>
                  </div>
                </div>
              </div>

              <div class="item-meta mt-2 text-right" style="color:#ccc;font-size: 12px;width: 150px;">
                <router-link :to="'/topics/'+item.id"><a class="ui">
                  <i class="mr-1 icon thumbs up"></i> {{item.user_count.zan_count}} </a>
                </router-link>
                <span style="margin: 0px 4px;text-align: center;font-size: 13px;">/</span>
                <a class="ui  popover" :data-content="'活跃于：'+item.updated_at_label" href="#">
                  {{item.updated_at_label}}
                </a>
              </div>
            </div>
          </div>
<!--          @include('topics._list',['topics'=>$topics])-->
<!--          @include('topics._list',['topics'=>$topics])-->
          <el-pagination
            v-if="data"
            background
            :page-size="parseInt(data.per_page)"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="changePage"
            :total="data.total">
          </el-pagination>
        </div>


      </div>
    </div>
    <div class="js-computed-height-left four wide column pull-left sidebar clear" style="padding-right: 0px;">
      <div class="item header blog-article sidebar" style="height:auto !important;">
        <!--<div class="ui link cards" id="user_info">
          <div class="card">
            <div class="image">
              <img :src="src">
            </div>
            <div class="content">
              <div class="header">
                pan_zoe
              </div>
              <div class="meta">
                1天前
              </div>
              <div class="description">
                简介： Ta很神秘哦~
              </div>
            </div>

            <div class="extra content">
              <button class="ui red basic button follow fluid user_attention" data-act="follow"
                      data-id="1" type="0">
                <i class="icon plus"></i> <span class="state">关注</span>
              </button>
              &lt;!&ndash;<button class="ui red basic button follow fluid user_attention" data-act="follow"
                      data-id="{{ $topic->user_id }}" type="1">
                <i class="icon checkmark"></i> <span class="state">已关注</span>
              </button>&ndash;&gt;
            </div>

            <div class="extra content">
              <a href="#" target="_blank">
                <button class="ui green basic button follow fluid">
                  <i class="icon angle double right"></i> <span class="state">Ta 的主页</span>
                </button>
              </a>
            </div>
          </div>
        </div>-->

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

              <a class="item" href="javascript:;" style="line-height: 22px;">
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
          <div v-for="(item,index) in category" :key="index" class="ui large vertical fluid pointing menu"
               style="border-left: 0;border-right: 0;border-bottom: 0;margin-top: 0;">
            <a class="item" href="javascript:;">
              {{item.name}}
              <div class="ui small label">{{item.topic_count}}</div>
            </a>
          </div>
        </div>


       <!-- <div class="ui card link tag-active-user-card blog-tags responsive">
          <div class="content">
            <span class="">博客标签</span>
          </div>
          <div class="extra content readmore" style="padding-bottom: 18px; max-height: none;">
            <a class="ui label basic" href="#">
              标签
              <div class="detail">laravel</div>
            </a>
          </div>
        </div>-->

        <!--<div class="ui sticky doc toc">
          <div class="ui card column author-box grid  tocify" id="markdown-tocify"
               style="max-height: 100%;padding: 22px 4px;"></div>
        </div>-->
      </div>
    </div>

    <!--    @include('topics._sidebar', ['sidebar_data'=> $sidebar_data])-->
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import {Topic} from '@/api/api'
  import {http} from "../api/config"
    export default {
        name: "Home",
        data() {
            return {
              src: require('@/assets/images/public/school.png'),
              data:null,
              topics:null,
              category:null,
              place_on_file:null,
              paginate:'',
              currentPage:1,
            }
        },
      watch:{
        '$route'(to,from){
          if (to.name === 'Home'){
            this.init();
          }
        }
      },
      created(){
          this.init();
        },
        methods:{
          async init(){
            if (this.$route.query.page !== undefined) {
              this.currentPage = parseInt(this.$route.query.page);
            }
            await http('topic',{page:this.currentPage},'GET',false).then(res =>{
              this.data = res.data.data.topics;
              this.topics = res.data.data.topics.data;
              this.category = res.data.data.category_count;
              this.place_on_file = res.data.data.place_on_file;
              this.paginate = res.data.data.paginate;
            });
          },
          zan(item,index) {
            const res = http('zan-topic/'+item.id,'','PUT',true);
            res.then(res=>{
              if (res.data.data){
                this.topics[index].is_zan = 1;
              }else{
                this.topics[index].is_zan = 0;
              }
            })
          },
          changePage(page) {
              this.$router.push('/home?page='+page);
          }
        },

    }
</script>

<style scoped>

</style>
