<template>
  <div class="ui centered grid container stackable" v-if="user">
<!--    @include('users._left', ['_left'=> ['active'=> 'show']])-->
    <user-left :statistics="user.statistics"></user-left>

    <!--    @if(if_route('users.show'))-->
    <div class="nine wide column">
      <div class="ui stacked segment">
        <div class="content px-3 py-3">
          <h1>
            <i class="icon user" aria-hidden="true"></i> {{ user.name }} 个人信息
          </h1>
          <div class="ui divider"></div>

          <div>
            <div class="ui segment text-center">注册于：<span class="ui popover"
                                                          :title="user.created_at">{{ user.created_at_label }}</span>
            </div>

          </div>
        </div>
      </div>
    </div>

<!--    @elseif(if_route('users.topics'))-->
<!--    @include('users._user_topics')-->
<!--    @elseif(if_route('users.follow_fans'))-->
<!--    @include('users._follow_and_fans')-->
<!--    @elseif(if_route('users.replies'))-->
<!--    @include('users._user_replies')-->
<!--    @elseif(if_route('users.vote_collect_topics'))-->
<!--    @include('users._user_vote_collect')-->
<!--    @endif-->
<!--    @include('users._right',['user'=>$user])-->
    <user-right :user="user"></user-right>
  </div>
</template>

<script>
    import {http} from "../api/config";
    import UserLeft from "./user-left";
    import UserRight from "./user-right";

    export default {
      name: "UserInfo",
      components: {UserRight, UserLeft},
      data() {
            return {
              user:null,
            }
        },
        async mounted() {
            let id = this.$route.params.id;
            await http('user/'+id).then(res => {
              this.user = res.data.data;
            })
        }
    }
</script>

<style scoped>

</style>
