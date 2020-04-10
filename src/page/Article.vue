<template>
  <div>
    <div class="ui basic teal  launch right attached fixed button" ref="right-menu-btn" id="right-menu-btn" @click="toggle()">
      <i class="content icon"></i>
      <span class="text">菜单</span>
    </div>
    <div class="ui vertical sidebar menu left book-side-menu" ref="book-side-menu">
      <div class="item lh-2">
        <b>标题</b>
      </div>

      <div class="item">
        <div class="header">
          nginx 实战
        </div>

        <div class="menu article">

          <a class="item 1"
             href="#">
            安装与部署
          </a>

        </div>
      </div>

    </div>



    <div class="ui centered grid container stackable">

      <div class="twelve wide column js-computed-height-right">
        <div class="ui segment article-content">
          <div class="extra-padding">
            <h1>
              <i class="grey file text outline icon"></i>
              <span style="line-height: 34px;">nginx</span>
            </h1>

            <div class="book-article-meta">
              <a href="">
                <i class="icon book"></i> nginx
              </a>

              <span class="divider">/</span>

              <span class="relative ">
                            <a class="chapter-title user-has-done-btn" data-act="chapter_sidebar_clicked"
                               href="javascript:void(0);">
                                <i class="icon map signs"></i>
                                安装与部署
                            </a>
                        </span>

              <!--<span style="font-size: 13px;color: #adb1af;">（
                                <a href="#"><i class="icon edit"></i>编辑</a>
                                <span class="divider">|</span>
                                <a class="  top-admin-operation ml-0" href="javascript:;"
                                   data-method="delete"
                                   data-url="#"
                                   style="cursor: pointer;"><i class=" trash icon"></i>删除
                                </a>）
                            </span>
            </div>-->

            <div class="ui divider"></div>

            <div class="ui readme markdown-body content-body fluidbox-content">
              <!--<blockquote style="border: dashed 3px #9bacc1;">
                <p>为了保证课程的高品质，我们需要对课程进行收费。
                  <a href="" target="_blank">付费后</a>
                  才能观看剩余内容。
                  <a class="ui  label green" href="" target="_blank">
                    <i class="icon shop"></i> 购买
                  </a>
                </p>
              </blockquote>-->
              这是文章内容主体
            </div>
          </div>
        </div>

        <div>
          <a class="ui basic button small article-pager-btn pull-left disabled page-prev-btn"
             data-content="" href="javascript:;">
            <i class="icon arrow left"></i> 上一篇
          </a>
          <a class="ui basic button small article-pager-btn pull-right popover disabled page-next-btn"
             data-content=""
             href="javascript:;">
            下一篇
            <i class="icon arrow right"></i>
          </a>
          <div class="clearfix"></div>
        </div>
      </div>

      <div class="four wide column js-computed-height-left">

      </div>
    </div>
    </div>
  </div>
</template>

<script>
  var allHref = [];
  $('.book-side-menu').find('a').each(function () {
    allHref.push({
      'href': $(this).attr('href'),
      'title': $.trim($(this).text()),
      'active': $(this).hasClass('active') ? true : false
    });
  });
  let activeIndex = allHref.findIndex(function(item){
    return item.active;
  });
  // 上一页
  let prev = allHref[activeIndex - 1];
  // 下一页
  let next = allHref[activeIndex + 1];

  if(prev){
    $('.page-prev-btn').attr('href', prev.href);
    $('.page-prev-btn').attr('data-content', prev.title);
    $('.page-prev-btn').removeClass('disabled');
  }
  if(next){
    $('.page-next-btn').attr('href', next.href);
    $('.page-next-btn').attr('data-content', next.title);
    $('.page-next-btn').removeClass('disabled');
  }
    export default {
        name: "Article",
        data(){
          return {
            visible :false,
          }
        },
        methods: {
          toggle(ev) {
            if (this.visible) {
              this.visible = false;
              $(this.$refs['right-menu-btn']).removeAttr('style');
              // $(this.$refs['book-side-menu']).removeClass('overlay visible');
              $(this.$refs['book-side-menu']).transition('fade left')
              return
            }
            this.visible = true;
            $(this.$refs['book-side-menu']).transition('fade right')
            $(this.$refs['right-menu-btn']).animate({"left": "200px", "padding": "10px 6px"});

            return;
          },
      }
    }
</script>

<style scoped>

</style>
