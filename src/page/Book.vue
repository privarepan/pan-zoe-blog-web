<template>
  <div class="ui centered grid container books-page stackable rm-link-color">
    <div class="fourteen wide column">
      <div class="ui segment">
        <div class="content extra-padding">
          <br>
          <div class="book header">
            <div class="ui items">
              <div class="item">
                <div class="image">
                  <img class="ui image image-shadow lazy"
                       data-original="">
                </div>
                <div class="content">
                  <div class="header" style="width:100%">
                    标题
                  </div>
                  <div class="description">
                    <div class="meta" style="line-height:24px">
                      <a href="javascript:;">
                        <i class="icon clock"></i> 更新于
                        <span title="2019-05-06">2019-05-06</span>
                      </a>
                    </div>
                    发生的范德萨范德萨范德萨
<!--                    {!! markdownToHtml($book->excerpt) !!}-->
                    这是测试内容
                  </div>
                  <div class="extra">
                    <a class="ui button teal go-start-read" href="javascript:;"><i
                      class="icon game"></i>开始阅读
                    </a>
                    <!--<a class="ui button orange" href="{{ route('sections.index', $book->id) }}">
                      管理章节
                    </a>
                    <a class="ui button green" href="{{ route('articles.create', $book->id) }}">
                      新建教程文章
                    </a>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ui  attached tabular menu" id="topics">
            <a class="item active" href="javascript:;">
              <i class="grey content icon"></i>
              文章列表
            </a>
          </div>
          <br>
          <ol class=" sorted_table tree " data-chapterid="0" data-filetype="chapter">
            <li class="item" data-itemid="461" data-filetype="chapter" data-chapterid="461">
              <i class="blue folder icon"></i>
<!--              {{ $section->title }}-->
              标题
              <ol data-chapterid="461" class="chapter-container">
                <li class="item" data-itemid="2517" data-filetype="file" data-chapterid="461">
                  <i class="grey file text outline icon"></i>
                  <router-link to="/article">
                    <a href="#" class="">
                      <!--                    {{ $article->title }}-->
                      标题2
                      <span class="ui left  green basic label">免费</span>
                      <!--                    <span class="ui left  green basic label">限免</span>-->
                    </a>
                  </router-link>

                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Book"
    }
</script>

<style scoped>

</style>
