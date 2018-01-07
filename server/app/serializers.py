from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from rest_framework.authtoken.models import Token
from votes.serializers import VoteSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    deals = serializers.HyperlinkedRelatedField(many=True, view_name='specific_deal', read_only=True)
    reviews = serializers.HyperlinkedRelatedField(many=True, view_name='specific_review', read_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'deals', 'reviews')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        fields = '__all__'
        model = models.Review


class DealSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        fields = '__all__'
        model = models.Deal

