"""my URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from login import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/', views.index),
    #登录
    url(r'^login/', views.login),
    #注册
    url(r'^register/', views.register),
    #登出
    url(r'^logout/', views.logout),
    #修改密码
    url(r'^pwd_change/', views.pwd_change),
    #挂失
    url(r'^report/', views.report),
    #挂失成功
    url(r'^reportSuccess/', views.reportSuccess),
    #定期存款
    url(r'^fixed/', views.fixed),
    #活期存款
    url(r'^current/', views.current),
    #活定期存款
    url(r'^deposit/', views.deposit),
    #取款
    url(r'^withdraw/', views.withdraw),
    #个人信息
    url(r'^Personal_information/', views.Personal_information),
    #查询
    url(r'^query/', views.query),
    #开户
    url(r'^openning/', views.openning),
    #销户
    url(r'^cancel/', views.cancel),
]