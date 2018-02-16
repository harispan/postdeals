from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from . serializers import UserSerializer
from rest_framework import generics
from . models import Deal, Review
from . serializers import DealSerializer, ReviewSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models
from . import serializers
from django.contrib.staticfiles import views


def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')

@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})


@api_view(['POST'])
def create_user(request):

    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response(serialized.data, status=HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)

# view all deals
class ListCreateDeal(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Deal.objects.all()
    serializer_class = serializers.DealSerializer

    def get_queryset(self):
        # return deals sorted by creation date
        return models.Deal.objects.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# create and view specific deal
class ListCreateSpecificDeal(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Deal.objects.all()
    serializer_class = serializers.DealSerializer

    def get_queryset(self):
        # returns deals based on deal primary key
        return models.Deal.objects.filter(id=self.kwargs.get('deal_pk'))

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# create review
class ListCreateReview(generics.ListCreateAPIView):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return models.Review.objects.order_by('-created_at').filter(deal=self.kwargs.get('deal_pk'))

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

