<template>
  <div class="three wide column" v-if="statistics">
    <div class="ui fluid vertical pointing right menu card link" style="border: 1px solid #d3e0e9;">
      <div class="header my-2 py-1">
        <h2 class="fs-normal pl-3 text-mute">Ta 的创作</h2>
      </div>
      <router-link :to="'/user-info/'+$route.params.id">
        <a class="item lh-2 user_left_a" :class="{active:$route.name === 'user-info'}">
          <i class="icon pr-1 nofloat user"></i> 基本资料
        </a>
      </router-link>
      <router-link :to="'/user-topic/'+$route.params.id">
        <a class="item lh-2 user_left_a" :class="{active:$route.name === 'user-topic'}">
          <i class="icon pr-1 nofloat file text outline"></i> Ta 的博文
          <span class="ui left  label">{{ statistics.topic_count }}</span>
        </a>
      </router-link>
      <router-link :to="'/user-reply/'+$route.params.id">
        <a :class="{active:$route.name === 'user-reply'}"
           class="item lh-2 user_left_a">
          <i class="icon pr-1 nofloat comment"></i> Ta 的回复
          <span class="ui left  label">{{ statistics.reply_count }}</span>
        </a>
      </router-link>

      <router-link :to="'/user-collect/'+$route.params.id">
        <a :class="{active:$route.name === 'user-collect'}" class="item lh-2 user_left_a">
          <i class="icon pr-1 nofloat heart outline"></i> Ta 的收藏
          <span class="ui left  label">{{ statistics.collect_count }}</span>
        </a>
      </router-link>

      <router-link :to="'/user-zan/'+$route.params.id">
        <a :class="{active:$route.name === 'user-zan'}" class="item lh-2 user_left_a">
          <i class="icon pr-1 nofloat thumbs up"></i> Ta 的点赞
          <span class="ui left  label">{{ statistics.zan_count}}</span>
        </a>
      </router-link>
    </div>


    <div class="ui fluid vertical pointing right menu card link" style="border: 1px solid #d3e0e9;">
      <div class="header my-2 py-1">
        <h2 class="fs-normal pl-3 text-mute">Ta 的关系</h2>
      </div>
      <router-link :to="'/user-star/'+$route.params.id">
        <a :class="{active:$route.name === 'user-star'}" class="item lh-2 user_left_a">
          <i class="icon pr-1 nofloat eye"></i> Ta 的关注
          <span class="ui left  label">{{ statistics.star_count }}</span>
        </a>
      </router-link>
      <router-link :to="'/user-fans/'+$route.params.id">
        <a :class="{active:$route.name === 'user-fans'}" class="item lh-2 user_left_a">
          <i class="icon pr-1 nofloat smile"></i> Ta 的粉丝
          <span class="ui left  label">{{ statistics.fans_count }}</span>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
    import {http} from "../api/config";
    // import "";

    export default {
        name: "UserLeft",
        data(){
          return {
          }
        },
        props:[ 'statistics'],
    }
</script>

<style scoped>
  .user_left_a {
    color: #636b6f;
    padding: .92857143em .824285714em .92857143em .4em;
  }
</style>
