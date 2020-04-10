/**
 * 1. 基于 axios 和 SweetAlert2 图片上传插件
 * 2. 不支持旧版浏览器, 谨慎使用
 * 3. 插件调用如下: 更多参数, 参考 contructor 方法下的 setting 默认配置
 */
/* **************************************************************
## html
```
<img id="upload-img"
     class="upload-img image-border ui popover"
     data-variation="inverted"
     data-content="【点击我】上传图片吧"
     src="{{ default_img() }}" width="320">
```

## javascript
```
$("#upload-img").click(function () {
    let self = this;
    new MyUploadOne({
        'f_type': '',
        success: function (res) {
            let path = assert_images(res.data.path);
            $(self).attr('src', path);
        }
    });
});
```
************************************************************** */

class MyUploadOne {
    constructor(setting = {}){
        // 默认值
        this.setting = Object.assign({}, {
            // 验证单个文件大小限制
            fileSingleSizeLimit: 2 * 1024 * 1024,
            method: 'POST',
            // 文件 name 字段
            file_name: 'image',
            // 文件所属类型 [ 后台需要 ][ 必填 ]
            f_type: '',
            // create:上传， update:更新, delete:删除
            action: 'create',
            url: '',
            // method: ''
            // path: ''     更新图片使用
            // 上传成功
            success: function () {},
            // 上传失败
            error: function () {}
        }, setting);

        if (this.setting.action == 'delete') {
            let formData = new FormData();
            // 自定义formData中的内容
            // 文件所属类型 [ 后台需要 ]
            formData.append('f_type', this.setting.f_type);
            // 动作
            formData.append('action', this.setting.action);

            if (this.setting.path) {
                formData.append('path', this.setting.path);
            }
            // 上传图片
            this.uploadImg(formData);
        } else {
            this.init();
        }
    }

    init(){
        let self = this;
        (async function getImage () {
            const {value: file} = await Swal.fire({
                title: '选择一个图片',
                input: 'file',
                inputAttributes: {
                    'accept': 'image/*',
                    'aria-label': 'Upload your profile picture'
                }
            });

            if (file) {
                // 展示
                let reader = new FileReader;
                reader.onload = (e) => {
                    let imgBase64 = e.target.result;
                    Swal.fire({
                        title: '正在上传, 请耐心等待...',
                        imageUrl: imgBase64,
                        imageAlt: '图片已准备好, 正在上传'
                    });
                };
                reader.readAsDataURL(file);

                // 相关上传操作
                self.handleInputChange(file);
            }
        })()
    }

    handleInputChange(file){
        // 检查文件类型
        if(['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0){

            Swal.fire('文件类型仅支持 jpeg/png/gif！', '', 'warning');
            return;
        }

        // 文件大小限制
        if(file.size > this.fileSingleSizeLimit ) {

            // 文件大小自定义限制
            Swal.fire('文件大小不能超过 2MB！', '', 'warning');
            return;
        }

        this.transformFileToFormData(file);
    }

    // 将File append进 FormData
    transformFileToFormData(file){
        let formData = new FormData();
        // 自定义formData中的内容
        // type
        formData.append('type', file.type);
        // size
        formData.append('size', file.size || "image/jpeg");
        // name
        formData.append('name', file.name);
        // lastModifiedDate
        formData.append('lastModifiedDate', file.lastModifiedDate);
        // append 文件
        formData.append(this.setting.file_name, file);
        // 文件所属类型 [ 后台需要 ]
        formData.append('f_type', this.setting.f_type);
        // 动作
        formData.append('action', this.setting.action);

        if (this.setting.path) {
            formData.append('path', this.setting.path);
        }
        // 上传图片
        this.uploadImg(formData);
    }

    // 上传图片
    uploadImg(formData){
        let self = this;
        let url = Config.routes.upload_image;
        let method = 'POST';
        if (this.setting.action != 'create') {
            url = this.setting.url;
            method = this.setting.method;
        }
        axios({
            url: url,
            method: method,
            data: formData
        }).then((res)=> {
            if (self.setting.action != 'delete') {
                Swal.fire('上传成功', '', 'success');
            }
            // 回调
            this.setting.success(res);
        }).catch(function (error) {
            let response = error.response,
                html = '';
            if (response.data && response.data.errors) {
                for (let error in response.data.errors) {
                    html += '<p style="text-align: left;">' + response.data.errors[error] + '</p>';
                }
                Swal.fire({
                    type: 'error',
                    html: html,
                    showConfirmButton: false,
                    showCancelButton: true
                });
            } else if(response.data && response.data.message){
                Swal.fire({
                    type: 'error',
                    text: response.data.message,
                    showConfirmButton: false,
                    showCancelButton: true
                });
            }else {
                // 回调
                self.setting.error(error);
            }
        });
    }
}

window.MyUploadOne = MyUploadOne;
