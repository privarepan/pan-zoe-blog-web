<template>
  <div class="four wide column ">
    <div class="ui card link">
      <div class="card">
        <a class="ui green ribbon label mb-3" href=""
           target="_blank">
          <i class="icon trophy"> 小白</i>
        </a>
        <div class="image">
          <a class="ui popover" style="cursor:default">
            <img style="width:100%" src="http://api.pan-zoe.com/img/default_avatar.ad36140.jpg">
          </a>
        </div>
        <div class="statistics mt-3 mb-3"
             style="border-top: 1px solid rgba(0, 0, 0, 0.05);border-bottom: 1px solid rgba(0, 0, 0, 0.05);padding-bottom: 15px;padding-top: 10px;">
          <div class="ui three statistics">
            <div class="ui statistic">
              <div class="label" style="font-size: 1em!important;font-weight: normal;">
                文章
              </div>
              <div class="value" style="font-size: 1em!important;font-weight: bold;">
                    <span class="ui popover bottom" data-content="博客文章总数">
                        {{ user.statistics.topic_count }}
                    </span>
              </div>
            </div>

            <div class="ui statistic">
              <div class="label" style="font-size: 1em!important;font-weight: normal;">
                粉丝
              </div>
              <div class="value" style="font-size: 1em!important;font-weight: bold;">
                    <span class="ui popover bottom" data-content="关注作者的用户数">
                        {{user.statistics.fans_count}}
                    </span>
              </div>
            </div>

            <div class="ui statistic">
              <div class="label" style="font-size: 1em!important;font-weight: normal;">
                关注
              </div>
              <div class="value" style="font-size: 1em!important;font-weight: bold;">
                    <span class="ui popover bottom" data-content="收到的点赞">
                        {{ user.statistics.zan_count }}
                    </span>
              </div>
            </div>

            <div class="clearfix"></div>
          </div>
        </div>
        <div class="rm-link-color">
          <h1 class="my-3 mx-2 fw-bold" title="性别">
            {{ user.name }}
            &nbsp;&nbsp;

            <i class="mars icon"></i>

<!--            <i class="venus icon"></i>-->

          </h1>
          <div class="my-2 mx-2" title="公司">
            <i class="address book outline icon" style="color:#a5a5a5"></i> {{ user.company }}
          </div>

          <div class="my-3 mx-2" title="城市">
            <i class="icon marker" style="color:#a5a5a5"></i> {{ user.city }}
          </div>

          <div class="ui divider" style="border-top: 1px solid rgba(0, 0, 0, 0.05);"></div>

          <div class="social rm-link-color my-3 mx-2">
            <p class="fw-bold" style="font-size:0.9em;color:#a5a5a5;">社交账号：</p>
            <a :href="user.github_site" target="_blank">
              <i style="color:#a5a5a5;font-size:1.2em" class="icon github alternate"></i>
            </a>
            <a href="" target="_blank">
              <i style="color:#a5a5a5;font-size:1.2em" class="icon wechat alternate"></i>
            </a>
            <a :href="user.weibo_site" target="_blank">
              <i style="color:#a5a5a5;font-size:1.2em" class="icon weibo alternate"></i>
            </a>
          </div>
          <div class="ui divider" style="border-top: 1px solid rgba(0, 0, 0, 0.05);"></div>
        </div>
        <!--<div class="extra content">

          <a class="ui button fluid basic"
             href=""
             id="user-edit-button">
            <i class="icon edit"></i> 编辑个人资料
          </a>

        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
    import {http} from "../api/config";
    // import "";

    export default {
        name: "UserRight",
        data(){
          return {

          }
        },
        props:[ 'user'],
    }
</script>

<style scoped>
  .user_left_a {
    color: #636b6f;
    padding: .92857143em .824285714em .92857143em .4em;
  }
</style>
