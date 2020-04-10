/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
window.FantasyCodeNew = null;
 require('./bootstrap_blog');

/** 返回对应位置 */
window.scrollToAnchor = function (id) {
    var e = $("*[id='" + id + "']");
    $("html,body").animate({
        scrollTop: e.offset().top
    }, "slow")
};

// 七牛 images 镜像
window.assert_images = function (path) {
    // return Config.routes.images_domain + path;
};

// 全局公用函数
window.public = {
    axios_then: function (res) {
        Swal.fire({
            type: 'success',
            title: res.msg,
        });
    },
    axios_catch: function (error) {
        let response = error.response,
            html = '';
        if (response.data && response.data.errors) {
            for (let error in response.data.errors) {
                html += '<p style="text-align: left;">' + response.data.errors[error] + '</p>';
            }
            Swal.fire(html, '', 'error');
        } else if (response.data && response.data.message) {
            Swal.fire(response.data.message, '', 'error');
        }
    },
};

class FantasyCode {
    init() {
        this.initFunc();
        this.initSubmitBtn();
        this.closeMessage();
        this.initSematicUI();
        this.initLazyload();
        this.initDeleteForm();
        this.initLightBox();
        // this.axiosDeleteForm();
    }

    initFunc() {
        // markdown 编辑的页面。非本站地址，以新窗口打开
        $('.markdown-body').find('a').each(function () {
            let href = $(this).attr('href');
            if (href.indexOf('learnku.net') === -1) {
                $(this).attr('target', '_black')
            }
        });
    }

    /** 表单提交 */
    initSubmitBtn() {
        $('button.ui.button[type="submit"]:not(.no-loading)').click(function () {
            // $(this).addClass("disabled");
            if ($(".clear-submit").length > 0) {
                var self = $(this);
                setTimeout(function () {
                    self.after('<a class="clear-submit ml-3 ts-small" href="javascript:;">清除加载状态</a>')
                }, 3000)
            }
        });

        $("body").on("click", "a.clear-submit", function () {
            $(this).siblings('button.ui.button[type="submit"]').removeClass("loading"),
                $(this).siblings('button.ui.button[type="submit"]').removeClass("disabled"),
                $(this).remove()
        })
    }

    /** 关闭 message 提示消息 */
    closeMessage() {
        $('.message .close').on('click', function () {
            $(this).closest('.message').transition('fade');
        });
    }

    /** SematicUI */
    initSematicUI() {
        $(".ui.dropdown").dropdown();
        $(".ui.community-nav.dropdown").dropdown({
            onChange: function (t, e, n) {
                window.location.href = n.attr("href")
            }
        });
        $(".ui.checkbox").checkbox();
        $(".ui.accordion").accordion();
        $(".ui.popover").popup({
            on: "hover",
            position: "top center"
        });
        // 文章详情页 贴附效果
        if ($('.js-computed-height-right ').outerHeight(true) >= $(".js-computed-height-left").outerHeight(true)) {
            $(".ui.toc.sticky").sticky({
                silent: true,
                debug: false,
                context: ".article-content"
            });
        }
        // 文章详情页 右边栏 贴附效果
        $(".ui.topic-operation.sticky").sticky({
            silent: true,
            context: ".main-column"
        });
        $(".ui.translate-box.sticky").sticky({
            silent: !0
        });
        $(".message .close").on("click", function () {
            $(".message-container").transition("fade")
        });
        $(".ui.left.sidebar").sidebar({
            transition: "overlay",
            mobileTransition: "uncover",
            observeChanges: !0,
            closable: !1,
            dimPage: !1,
            onVisible: function () {
                var e = 200 / screen.width * 100
                    , n = 100 - e + "%";
                $(".pusher").width(n),
                    $(".pusher").animate({
                        marginLeft: e + "%"
                    }, 400)
            },
            onShow: function () {
                $(".fixed.launch.button").css("left", 200),
                    $(".fixed.launch.button").css("padding", "10px 6px"),
                    $(".ui.toc.sticky").sticky("refresh")
            },
            onHide: function () {
                $(".pusher").width("100%"),
                    $(".pusher").css("margin-left", "inherit"),
                    $(".ui.toc.sticky").each(function () {
                        $(this).data("moduleSticky").refresh()
                    }),
                    $(".fixed.launch.button").css("padding", "0.78571429em 1.5em 0.78571429em"),
                    $(".fixed.launch.button").css("left", 0)
            },
            onHidden: function () {
                $(".ui.toc.sticky").sticky("refresh")
            }
        }).sidebar("attach events", ".launch.button, .chapter-title, .launch.item");
        $(".ui.top.sidebar").sidebar({
            transition: "overlay",
            mobileTransition: "uncover"
        }).sidebar("attach events", ".item.header.right.menu");
        $(".ui.progress").progress();

        // 选项页
        $('.menu .item').tab()
    }

    /** 懒加载*/
    initLazyload() {
        // <img class="lazy" data-original="img/corvette_pitstop.jpg">
        $("img.lazy").lazyload({
            // placeholder
        });
    }

    /** 删除 form 表单 */
    initDeleteForm() {
        $("[data-method]").append(function () {
            return `
                <form action="${$(this).attr("data-url")}" method='POST' style='display:none'>
                    <input type='hidden' name='_method' value="${$(this).attr("data-method").toUpperCase()}">
                    <input type='hidden' name='_token' value="${Config.token}">
                </form>
            `;
        }).css("cursor", "pointer").click(function () {
            var self = this;
            var e = $(this);
            var method = e.attr("data-method").toUpperCase();
            if ("DELETE" == method) {
                Swal.fire({
                    title: "",
                    html: $(self).attr("data-hint") ? $(self).attr("data-hint") : "你确定要删除此内容吗？",
                    type: "warning",
                    confirmButtonColor: '#21BA45',
                    cancelButtonColor: '#d33',
                    showCancelButton: !0,
                    cancelButtonText: "取消",
                    confirmButtonText: "删除"
                }).then(function (res) {
                    if (res.value) {
                        e.find("form").submit()
                    }
                })
            } else if ("POST" != method && "GET" != method || (e.attr("data-prompt"))) {
                Swal.fire({
                    title: "",
                    html: $(self).attr("data-prompt"),
                    type: "warning",
                    showCancelButton: !0,
                    cancelButtonText: "取消",
                    confirmButtonText: "确定"
                }).then(function (res) {
                    if (res.value) {
                        e.find("form").submit()
                    }
                })
            }
        });
    }

    /** 删除 form 表单 2*/
    axiosDeleteForm(callback = null) {
        $("[axios-method]").css("cursor", "pointer").click(function () {
            let self = this;
            let method = $(this).attr("axios-method").toUpperCase();

            if ("DELETE" == method) {
                Swal.fire({
                    title: "",
                    html: $(self).attr("data-hint") ? $(self).attr("data-hint") : "你确定要删除此内容吗？",
                    type: "warning",
                    confirmButtonColor: '#21BA45',
                    cancelButtonColor: '#d33',
                    showCancelButton: !0,
                    cancelButtonText: "取消",
                    confirmButtonText: "删除"
                }).then(function (res) {
                    axios({
                        url: $(self).attr('data-url'),
                        method: method
                    }).then((res) => {

                        if (callback) {
                            callback(self, res);
                        }
                        Swal.fire({
                            type: 'success',
                            confirmButtonColor: '#21BA45',
                            title: '评论删除成功~',
                        });
                    })
                })
            } else if ("POST" != method && "GET" != method || (e.attr("data-prompt"))) {
                /*Swal.fire({
                    title: "",
                    html: $(self).attr("data-prompt"),
                    type: "warning",
                    showCancelButton: !0,
                    cancelButtonText: "取消",
                    confirmButtonText: "确定"
                }).then(function(res) {
                    if(res.value){
                        e.find("form").submit()
                    }
                })*/
            }
        })
    }

    /** 图库灯箱 */
    initLightBox() {
        $(".fluidbox-content img:not(.emoji)").each(function () {
            $(this).wrap("<a href='" + $(this).attr("src") + "' class='fluidbox'></a>")
        }).promise().done(function () {
            $("a.fluidbox").fluidbox()
        })
    }

    /** 检测用户 是否登录*/
    checkAuth(){

        if (Config.auth === false || Config.auth === '0' || Config.auth === '') {
            Swal.fire({
                title: '马上去登录吧~',
                text: "您还未登录，无法关注您喜爱的作者哦~",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#21BA45',
                cancelButtonColor: '#d33',
                confirmButtonText: '去登录',
                cancelButtonText: '不了',
            }).then((result) => {
                if (result.value) {
                    window.location.href = Config.routes.login;
                }
            });
            return false;
        }

        return true;
    }


    /** 用户关注和取消关注 */
    userAttention(self) {

        if(this.checkAuth() === false){
            return false;
        }

        var icon = $(self).find('i');
        var op = 1;
        if ($(self).attr('type') === '1') {
            //已关注，取消关注
            op = 0;
            icon.addClass("spinner loading").removeClass("checkmark");
        } else {
            //未关注，关注
            icon.addClass("spinner loading").removeClass("plus");
        }
        var user_id = $(self).attr('data-id');

        axios({
            method: 'POST',
            url: Config.routes.user_attention,
            data: {user_id:user_id, op: op},
        }).then((res) => {
            icon.addClass("plus").removeClass("spinner loading");

            if (res.status) {
                $(self).find('span').text(res.data.data.collect_count);
                if ($(self).attr('type') === '1') {
                    $(self).find('i').removeClass('spinner loading').addClass('plus');
                    $(self).find('.state').html('关注');
                    $(self).attr('type', '0');
                } else {
                    $(self).find('i').removeClass('spinner loading').addClass('checkmark').addClass('red');
                    $(self).find('.state').html('已关注')
                    $(self).attr('type', '1');
                }
            } else {
                Swal.fire({
                    position: 'top-end',
                    type: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
            }

        }).catch(function (error) {
            window.public.axios_catch(error);
        });
        return false;
    }

    /** 文章收藏 取消收藏*/

    topicCollect(self){
        if(this.checkAuth() === false){
            return false;
        }

        var icon = $(self).find('i');
        icon.addClass("spinner loading").removeClass("heart");
        var op = 1;

        if (icon.hasClass('active')) {
            op = 0;
        }
        var topic_id = icon.attr('topic_id');

        axios({
            url: Config.routes.topic_vote_collect,
            data: {topic_id: topic_id, type: 'collect', op: op},
            method: 'post',
        }).then((res) => {
            icon.addClass("heart").removeClass("spinner loading");

            if (res.status) {
                $(self).find('span').text(res.data.data.collect_count);
                if (op == 0) {
                    $(self).find('i').removeClass('active');
                } else {
                    Swal.fire({
                        type: 'success',
                        confirmButtonColor: '#21BA45',
                        title: '收藏成功~',
                    });
                    $(self).find('i').addClass('active');
                }
            } else {
                Swal.fire({
                    position: 'top-end',
                    type: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
    }


    /** 文章点赞取消点赞*/

    topicVote(self){

        if(this.checkAuth() === false){
            return false;
        }
        var icon = $(self).find('i');
        icon.addClass("spinner loading").removeClass("thumbs up");
        var op = 1;

        if (icon.hasClass('active')) {
            op = 0;
        }
        var topic_id = icon.attr('topic_id');

        axios({
            url: Config.routes.topic_vote_collect,
            data: {topic_id: topic_id, type: 'vote', op: op},
            method: 'post',
        }).then((res) => {
            icon.addClass("thumbs up").removeClass("spinner loading");
            if (res.status) {
                $(self).find('span').text(res.data.data.vote_count);
                if (op == 0) {
                    $(self).find('i').removeClass('active');
                } else {
                    $(self).find('i').addClass('active');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '网站好像开小差了^_^~',
                    text: '什么鬼?一起来吐槽站长吧',
                    footer: '<a href>留言板</a>'
                });
            }
        })
    }


}


/** 代码高亮工具 */
class MarkdownBody {
    constructor() {
        this.bodyClass = '.markdown-body';
        this.codeClass = '.markdown-body pre';
        this.addLineNumber();
        this.addThreePoints();
        this.addTitleNav();
    }

    /** 增加行号 */
    addLineNumber() {
        $(this.codeClass).addClass("line-numbers").css("white-space", "pre-wrap");
    }

    /** 增加 三个点 漂亮样式 */
    addThreePoints() {
        var html = '<div class="window-controls"><i class="red"></i><i class="yellow"></i><i class="green"></i></div>';
        $(this.codeClass).prepend(html);
    }

    /** 增加标题导航 tocify */
    addTitleNav() {
        var self = this;
        var selectors = ['h1', 'h2', 'h3', 'h4'];
        var selectorsTmp = [];
        selectors.forEach((item) => {
            if ($(self.bodyClass).find(item).length > 0) {
                selectorsTmp.push(item);
            }
        });
        if (selectorsTmp.length > 0) {
            selectorsTmp = selectorsTmp.join(', ');
        } else {
            selectorsTmp = '';
        }
        /**   #markdown-tocify   */
        $("#markdown-tocify").tocify({
            theme: '',
            context: self.bodyClass,    // 任意可用的jQuery选择器
            selectors: selectorsTmp,    // 文章节点，可以关联生成目录
            showAndHide: false,         // 是否展示二级目录结构
            showEffect: 'show',          // 目录展示效果："none", "fadeIn", "show", or "slideDown"
            hashGenerator: function (a, b) {
                // 返回随机数
                return Math.random().toString(36).substr(2, 10);
            }
        });
    }
}

/** 代码调用 ******************************************************/
// 代码高亮工具
new MarkdownBody();
// 基础代码
window.FantasyCodeNew = new FantasyCode();
FantasyCodeNew.init();
