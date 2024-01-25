from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from todolist.models import *


# Create your views here.
class addEntry_view(APIView):
    def post(self, request):
        namee = request.data["name"]
        priorityy = request.data["priority"]

        if not Notes.objects.filter(name=namee, priority=priorityy).exists():
            Notes.objects.create(name=namee, priority=priorityy)
            # print("data added")

            insertedData = {
                "name": namee,
                "priority": priorityy,
            }

            return Response(
                {"msg": "Data Inserted Successfully", "postData": insertedData}
            )

        else:
            return Response({"msg": "Task Name Already exists"})

    def get(self, request):
        data = Notes.objects.values()

        return Response({"msg": "Working ", "data": data})


class deleteEntry_view(APIView):
    def delete(self, request, id):
        if Notes.objects.filter(id=id).exists():
            query = Notes.objects.filter(id=id)
            query.delete()

            return Response({"msg": "Data Deleted"})

        else:
            return Response({"msg": "Wrong Data"})
