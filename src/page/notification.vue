<template>
  <div class="ui centered grid container stackable">
    <div class="twelve wide column">
      <div class="ui stacked segment">
        <div class="content px-3 py-3">
          <h1>
            <i class="bell outline icon"></i> 我的提醒
          </h1>

          <div class="ui divider mb-0"></div>

          <div class="ui feed notifications mt-0 rm-link-color text-decoration-underline">

            <div class="event  pt-4 pb-3 px-0 mb-0 " style="border-radius: 4px;">
              <a class="label" href="javascript:;">
                <img class="media-object img-thumbnail avatar" alt="QueuingAnt"
                     src=""
                     style="width:38px;height:38px;"></a>

              <div class="content">
                <div class="summary">
                  <a href="javascript:;">名称</a>

                  • 回复了你的文章:

<!--                  • 关注了你:-->
                  <a href="javascript:;">标题</a>
                  <span class="date pull-right">
                                                 <i class="icon time"></i>
                                                <span title="创建时间">
                                                    3天前
                                                </span>
                                            </span>
                  <span class="date pull-right">
                                                    <span class="ui circular label notification" title="已读时间">已读</span>
<!--                                                    <span class="red ui circular label notification" title="未读">未读</span>-->
                                            </span>
                </div>
                <div
                  class=" markdown-reply mt-2">回复内容
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "notification"
    }
</script>

<style scoped>

</style>
