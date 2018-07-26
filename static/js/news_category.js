//添加分类
$(function () {
    var addBtn = $("#add-btn");
    addBtn.click(function () {
        swal({
            title: '添加新闻分类',
            type:"input",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: '请输入新闻分类',
            },
        function (inputValue) {
            if(inputValue === false) return false;
            else if(inputValue === ''){
                swal.showInputError('输入框不能为空！');
                return false;
            }
            else
            {
                xfzajax.post({
                    'url': '/cms/add_news_category/',
                    'data': {
                        'name': inputValue  //这里name的值是要给到cms/下面的views.py中add_news_caetgory这个函数中的name = request.POST.get('name')
                        // inputValue是显示输入框中用户自己输入的内容
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            swal({
                                title:"提示",
                                text:"添加成功！",
                                type:"success",
                                timer:1000,
                            },
                            function () {
                                // setTimeout("window.location.reload()","1000");  /效果等价于下面一行，但是如果用下面一行的话就需要在上面的swal中给个timer时间
                                window.location.reload()
                            }
                            );
                        }else{
                            swal.close();
                            window.messageBox.showError(result['message']);
                        }
                    }
                });
            }
        }
        );
    });
});


//编辑分类
$(function () {
    var editBtn = $('.edit-btn');
    editBtn.click(function () {
        var currentBtn = $(this);
        var tr = currentBtn.parent().parent();
        var pk = tr.attr('data-pk');
        var name = tr.attr('data-name');
        swal({
            title: '请输入新名称',
            type:"input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: '请输入分类名称',
            inputValue: name
            },
        function (inputValue) {
            if(inputValue === false) return false;
            else if(inputValue === ''){
                swal.showInputError('输入框不能为空！');
                return false;
            }
            else
            {
                xfzajax.post({
                    'url': '/cms/edit_news_category/',
                    'data': {
                        'pk': pk,
                        'name': inputValue
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            swal({
                                title:"提示",
                                text:"更新成功！",
                                type:"success",
                                timer:1000,
                            },
                                function () {
                                // setTimeout("window.location.reload()","1000");  //效果等价于下面一行，但是如果用下面一行的话就需要在上面的swal中给个timer时间
                                window.location.reload();
                                }
                            );
                        }else{
                            swal.close(); //关闭提示窗口
                            window.messageBox.showError(result['message']);
                        }
                    }
                });
            }
        }
        );
    });
});


//删除分类
$(function () {
    var deleteBtn = $('.delete-btn');
    deleteBtn.click(function () {
        var currentBtn = $(this);
        var tr = currentBtn.parent().parent();
        var pk = tr.attr('data-pk');
        swal({
                title: "确定删除吗？",
                text: "删除后无法恢复！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定删除",
                closeOnConfirm: false,  //如果希望以后点击了确认按钮后模态窗口仍然保留就设置为"false",表示当点击确认或者取消的时候是否关闭对话框
            },
            function () {
                xfzajax.post({
                    'url': '/cms/delete_news_category/',
                    'data': {
                    'pk': pk
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            swal({
                                title:"删除",
                                text:"分类已被删除！",
                                type:"success",
                                showConfirmButton: false,  //表示ok按钮不显示
                                timer:1000,
                            },
                            function () {
                                // setTimeout("window.location.reload()","1000");  //效果等价于下面一行，但是如果用下面一行的话就需要在上面的swal中给个timer时间
                                window.location.reload();
                            });

                        }
                    }
                });
        });
    });
});







// 添加分类
// $(function () {
//     var addBtn = $("#add-btn");
//     addBtn.click(function () {
//         xfzalert.alertOneInput({
//             'title': '添加新闻分类',
//             'placeholder': '请输入新闻分类',
//             'confirmCallback': function (inputValue) {
//                 xfzajax.post({
//                     'url': '/cms/add_news_category/',
//                     'data': {
//                         'name': inputValue  //这里name的值是要给到cms/下面的views.py中add_news_caetgory这个函数中的name = request.POST.get('name')
//                         // inputValue是显示输入框中用户自己输入的内容
//                     },
//                     'success': function (result) {
//                         if(result['code'] === 200){
//                             swal("提示", "添加成功！","success");
//                             setTimeout("window.location.reload()","1000");
//                             // window.location.reload(); //表示重新加载当前页面
//                         }else{
//                             swal.close();
//                             window.messageBox.showError(result['message']);
//                         }
//                     }
//                 });
//             }
//         });
//     });
// });










// 编辑分类
// $(function () {
//     var editBtn = $('.edit-btn');
//     editBtn.click(function () {
//         var currentBtn = $(this);
//         // var tr = currentBtn.parent().parent();
//         var pk = tr.attr('data-pk');
//         var name = tr.attr('data-name');
//         xfzalert.alertOneInput({
//             'title': '请输入新名称',
//             'placeholder': '请输入分类名称',
//             'value': name,
//             'confirmCallback': function (inputValue) {
//                 xfzajax.post({
//                     'url': '/cms/edit_news_category/',
//                     'data': {
//                         'pk': pk,
//                         'name': inputValue
//                     },
//                     'success': function (result) {
//                         if(result['code'] === 200){
//                             swal("提示", "更新成功！","success");
//                             setTimeout("window.location.reload()","1000");
//                             // window.location.reload();
//                         }
//                     }
//                 });
//             }
//         });
//     });
// });




// 删除分类
// $(function () {
//     var deleteBtn = $('.delete-btn');
//     deleteBtn.click(function () {
//         var currentBtn = $(this);
//         var tr = currentBtn.parent().parent();
//         var pk = tr.attr('data-pk');
//         xfzalert.alertConfirm({
//             'text': '您确定要删除这个分类吗？',
//             'confirmCallback': function () {
//                 xfzajax.post({
//                     'url': '/cms/delete_news_category/',
//                     'data': {
//                         'pk': pk
//                     },
//                     'success': function (result) {
//                         if(result['code'] === 200){
//                             xfzalert.alertSuccess("删除成功！");
//                             setTimeout("window.location.reload()","1500");
//                             // window.location.reload();
//                         }
//                     }
//                 });
//             }
//         });
//     });
// });


