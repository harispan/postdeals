from django.db import models
from django.contrib.auth.models import User
from votes.managers import VotableManager


class Deal(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    owner = models.ForeignKey('auth.User', related_name='deals', on_delete=models.CASCADE)
    votes = VotableManager()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Review(models.Model):
    owner = models.ForeignKey('auth.User', related_name='reviews', on_delete=models.CASCADE)

    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment
