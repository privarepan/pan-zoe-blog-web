<template>
  <div class="ui centered grid container stackable" style="margin-bottom: 80px;min-height:380px">

    <div class="twelve wide column">

      <div class="ui segment text-center orange">
        一起努力，每日精进
      </div>

      <div class="ui segment ">
        <div class="extra content tag-active-user-card">
          <div class="ui middle aligned divided list " style="padding:12px">
            <div class="ui items">
              <div class="item">
                <a class="image" href="#">
                  <img class="ui image image-shadow " src="#"></a>
                <div class="content">
                  <div class="header" style="width:100%">
                    <a href="#" class="ui text" style="color: teal;">
                      B1 php
                    </a>
                  </div>
                  <div class="description">
                    tesrewrewrewqrewfdafdsfds
                  </div>
                  <div class="extra">
                    <router-link to="/book">
                      <a class="ui button teal " href="#">查看课程</a>
                    </router-link>


                    <!--<a class="ui button orange" href="#">编辑</a>
                    <form action="#" method="POST" style="display: inline;" onsubmit="return confirm('你确定要删除吗 ?');">
                      <input type="hidden" name="_method" value="DELETE">
                      <button type="submit" class="ui button red">删除 </button>
                    </form>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      {{ $books->render() }}-->
      <!--<div class="">
        <div class="ui segment basic lh-4 py-4" style="max-width:500px;width: 100%;margin: 0 auto;border: 1px dashed #c0c0c1;font-size: 15px;">
          <h4>教程正在紧锣密鼓撰写中...</h4>
          <p class="lh-3">
            邀您参与创建教程可以是 <b>技术</b> 相关的「文档翻译」、「技术笔记」或「开源文档」等。
            具体事宜请联系站长哦~
          </p>
        </div>
      </div>-->


    </div>




  </div>
</template>

<script>
    export default {
        name: "Books"
    }
</script>

<style scoped>

</style>
