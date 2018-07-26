
// 点击切换图形验证码
$(function () {
    var imgCaptcha = $('.img-captcha');
    imgCaptcha.click(function () {
        imgCaptcha.attr("src",'/account/img_captcha'+"?random="+Math.random());
    });
});


// 点击发送短信验证码
$(function () {
    var smsCaptcha = $('.sms-captcha-btn');
    function send_sms() {
        // 获取手机号码的时候，获取的是手机号码，而不是手机号码的输入框
        var telephone = $('input[name="telephone"]').val();
        console.log(telephone);
        if(!telephone||telephone.length != 11){
           // alert('手机号码输入不正确！');  //版本1
            /*
                版本2
                1.找出这两个div的class或id
                2.做相应的显示或隐藏处理即可；
                3.<div id="div_1"></div> //要显示的div;
                <div id="div_2"></div>//要隐藏的div;
                显示：style="display:block"或者 $('#div_1').show();
                隐藏：style="display:none"或者$('#div_2').hide();
            */
           //  $("#wrap").show(); //让默认隐藏的这个盒子显示出来              //版本2
           //  $("#wrap").html("请正确输入手机号码！");  //版本2
            window.messageBox.showError("请正确输入手机号码!"); //版本3
           //  $("#box1").before("<div id = 'box2' style='color:red;text-align: center;'></div>");  //版本4
           //  $("#box2").html("请正确输入手机号码！");    //版本4

           return;
        }
        else{
            // 这里要么写 $.ajax 要么 $.get表示get请求 要么 $.post表示post请求，后面两种方法的话'method': 'get',的请求方式可写可不写
            $.ajax({
                'method': 'get',
                'url': '/account/sms_captcha/',
                // 这里的telephone6是要传给views.py中telephone = request.GET.get('telephone6')这里的两边要保持一致
                'data':{'telephone6': telephone},
                //success表示：如果成功的话则执行以下代码
                'success': function (result) {
                    var count = 10;
                    smsCaptcha.addClass('disabled');
                    smsCaptcha.unbind('click');
                    var timer = setInterval(function () {
                        smsCaptcha.text(count);
                        count--;
                        if(count <= 0){
                            clearInterval(timer);
                            smsCaptcha.text('发送验证码');
                            smsCaptcha.removeClass('disabled');
                            smsCaptcha.click(send_sms);
                        }
                    },1000);
                },
                //fail表示如果失败的话则执行以下代码
                'fail': function (error) {
                    console.log(error);
                }
            });
        }
    }
    smsCaptcha.click(send_sms);
});


// //ajax的方式注册功能
$(function () {
    var telephoneInput = $("input[name='telephone']");
    var usernameInput = $("input[name='username']");
    var imgCaptchaInput = $("input[name='img_captcha']");
    var password1Input = $("input[name='password1']");
    var password2Input = $("input[name='password2']");
    var smsCaptchaInput = $("input[name='sms_captcha']");
    var submitBtn = $(".submit-btn");

    submitBtn.click(function (event) {
        // 禁止掉传统的表单发送数据的方式
       event.preventDefault();

       var telephone = telephoneInput.val();
       var username = usernameInput.val();
       var imgCaptcha = imgCaptchaInput.val();
       var password1 = password1Input.val();
       var password2 = password2Input.val();
       var smsCaptcha = smsCaptchaInput.val();

       if(!telephone||telephone.length != 11){
           // alert('手机号码输入不正确！');
           window.messageBox.showError("请正确输入手机号码!");
           return;
        }

        xfzajax.post({
            'url': '/account/register/',
            'data': {
                'telephone': telephone,
                'username': username,
                'img_captcha': imgCaptcha,
                'password1': password1,
                'password2': password2,
                'sms_captcha': smsCaptcha
            },
            'success': function (result) {
                if(result['code'] === 200){
                    window.location = '/';
                }else{
                    var message = result['message'];
                    window.messageBox.showError(message);
                }
            },
            'fail': function (error) {
                console.log(error);
            }
        });
    });
});