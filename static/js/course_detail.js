
$(function () {
    var span = $(".video-container span");
    var video_url = span.attr("data-video-url");
    var cover_url = span.attr('data-cover-url');
    var course_id = span.attr('data-course-id');
    var player = cyberplayer("playercontainer").setup({
        width: '100%',
        height: '100%',
        file: video_url,
        //视频未播放前的图片
        image: "http://ignd50m89sed0nvg46w.exp.bcevod.com/mda-igptau82rve1w5bj/mda-igptau82rve1w5bj.jpg",
        autostart: false,
        stretching: "uniform",
        repeat: false,
        volume: 100,
        controls: true,
        tokenEncrypt: "true",
        // 百度云控制台->右上角头像点击->安全认证AccessKey
        ak: 'a0192dea9a674fbeb999256e4a494613'
    });
    player.on("beforePlay",function (e) {
        if(!/m3u8/.test(e.file)){
            return;
        }

        xfzajax.get({
            'url': '/course/course_token/',
            'data': {
                'video_url': video_url,
                'course_id': course_id
            },
            'success': function (result) {
                if(result['code'] === 200){
                    var token = result['data']['token'];
                    player.setToken(e.file,token);
                }else{
                    window.messageBox.showError(result['message']);
                    player.stop();
                }
            }
        });
    });
});