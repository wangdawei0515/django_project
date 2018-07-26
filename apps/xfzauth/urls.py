#encoding: utf-8

from django.urls import path
from . import views

# 这里取这个名字了后，那么视图文件(views.py)文件中重定向页面跳转时需要<app_name+url_name>如：'xfzauth:login'
app_name = 'xfzauth'

urlpatterns = [
    path("login/",views.LoginView.as_view(),name='login'),
    path("register/",views.RegisterView.as_view(),name='register'),
    path("img_captcha/",views.img_captcha,name='img_captcha'),
    path("sms_captcha/",views.sms_captcha,name='sms_captcha'),
    path("logout/",views.logout_view,name='logout'),
]