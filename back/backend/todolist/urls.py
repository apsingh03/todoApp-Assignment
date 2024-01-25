
from django.contrib import admin
from django.urls import path

from todolist.views import *

urlpatterns = [

    path('add/', addEntry_view.as_view() , name="addEntry_view" ),
    path('delete/<str:id>/', deleteEntry_view.as_view() , name="deleteEntry_view" ),

]

