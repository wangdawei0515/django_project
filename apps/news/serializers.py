#encoding: utf-8

from rest_framework import serializers
from .models import News,NewsCategory,Comment
from apps.xfzauth.serializers import UserSerizlizer

class NewsCategorySerizlizer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ('id','name')

class NewsSerializer(serializers.ModelSerializer):
    category = NewsCategorySerizlizer()
    author = UserSerizlizer()
    class Meta:
        model = News
        fields = ('id','title','desc','thumbnail','pub_time','category','author')


class CommentSerizlizer(serializers.ModelSerializer):
    author = UserSerizlizer()
    class Meta:
        model = Comment
        fields = ('id','content','author','pub_time')