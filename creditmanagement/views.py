from django.shortcuts import render

# Create your views here.
def page1(request):
    return render(request,'page1.html')
def page3(request):
    return render(request,'pagen3.html')
