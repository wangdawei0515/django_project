#encoding: utf-8
from utils import restful
from django.shortcuts import redirect

#通过ajax请求去访问一个需要授权的页面去判断是否登录
def xfz_login_required(func):
    def wrapper(request,*args,**kwargs):
        if request.user.is_authenticated:
            return func(request,*args,**kwargs)
        else:
            if request.is_ajax():
                return restful.unauth(message='请先登录！')
            else:
                return redirect('/')
    return wrapper


