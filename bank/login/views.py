from django.shortcuts import render, redirect
from . import models
from .forms import UserForm
from .forms import RegisterForm
from .forms import ChangepwdForm
import hashlib

#密码加密
def hash_code(s, salt='my'):  # 加点盐
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())  # update方法只接收bytes类型
    return h.hexdigest()


def index(request):
    pass
    return render(request, 'login/index.html')


def login(request):
    #不允许重复登录
    if request.session.get('is_login', None):
        return redirect('/query')

    if request.method == "POST":
        login_form = UserForm(request.POST)
        message = "请检查填写的内容！"
        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']
            try:
                user = models.User.objects.get(name=username)
                if user.password == hash_code(password):  # 哈希值和数据库内的值进行比对
                    #往session字典内写入用户状态和数据
                    request.session['is_login'] = True
                    request.session['user_id'] = user.id
                    request.session['user_name'] = user.name
                    return redirect('/query/')
                else:
                    message = "密码不正确！"
            except:
                message = "用户不存在！"
        return render(request, 'login/login.html', locals())

    login_form = UserForm()
    return render(request, 'login/login.html', locals())


def register(request):
    if request.session.get('is_login', None):
        # 登录状态不允许注册。你可以修改这条原则！
        return redirect("/index/")
    if request.method == "POST":
        register_form = RegisterForm(request.POST)
        message = "请检查填写的内容！"
        if register_form.is_valid():  # 获取数据
            username = register_form.cleaned_data['username']
            password1 = register_form.cleaned_data['password1']
            password2 = register_form.cleaned_data['password2']
            email = register_form.cleaned_data['email']
            sex = register_form.cleaned_data['sex']
            if password1 != password2:  # 判断两次密码是否相同
                message = "两次输入的密码不同！"
                return render(request, 'login/register.html', locals())
            else:
                same_name_user = models.User.objects.filter(name=username)
                if same_name_user:  # 用户名唯一
                    message = '用户已经存在，请重新选择用户名！'
                    return render(request, 'login/register.html', locals())
                same_email_user = models.User.objects.filter(email=email)
                if same_email_user:  # 邮箱地址唯一
                    message = '该邮箱地址已被注册，请使用别的邮箱！'
                    return render(request, 'login/register.html', locals())

                # 当一切都OK的情况下，创建新用户

                new_user = models.User.objects.create()
                new_user.name = username
                new_user.password = hash_code(password1)  # 使用加密密码
                new_user.email = email
                new_user.sex = sex
                new_user.save()
                return redirect('/login/')  # 自动跳转到登录页面
    register_form = RegisterForm()
    return render(request, 'login/register.html', locals())


def logout(request):
    if not request.session.get('is_login', None):
        # 如果本来就未登录，也就没有登出一说
        return redirect("/index/")
    request.session.flush()
    # 或者使用下面的方法
    # del request.session['is_login']
    # del request.session['user_id']
    # del request.session['user_name']
    return redirect("/index/")

#修改密码
def pwd_change(request):
    if request.method == 'POST':
        pwd_form = ChangepwdForm(request.POST)
        if pwd_form.is_valid():
            username = pwd_form.cleaned_data['username']
            Password = pwd_form.cleaned_data['Password']
            newPassword = pwd_form.cleaned_data['newPassword']
            ensurePassword = pwd_form.cleaned_data['ensurePassword']
            user = models.User.objects.get(name=username)
            if user:
                if check_password(request.POST.get('password'), user.password):
                    user.password = make_password(request.POST.get('new_password'))
                    user.save()
                    return ...
                return ...
            return ...
        else:
            return ...
    pwd_form = ChangepwdForm()
    return render(request, 'password_change/pwd_change.html')

def report(request):
    pass
    return render(request, 'report/report.html')

def reportSuccess(request):
    pass
    return render(request, 'report/reportSuccess.html')

def fixed(request):
    pass
    return render(request, 'deposit&withdraw/fixed.html')

def current(request):
    pass
    return render(request, 'deposit&withdraw/current.html')

def deposit(request):
    pass
    return render(request, 'deposit&withdraw/deposit.html')

def withdraw(request):
    pass
    return render(request, 'deposit&withdraw/withdraw.html')

def Personal_information(request):
    pass
    return render(request, 'deposit&withdraw/Personal_information.html')

def query(request):
    pass
    return render(request, 'user/query.html')

def openning(request):
    pass
    return render(request, 'user/openning.html')

def cancel(request):
    pass
    return render(request, 'user/cancel.html')

