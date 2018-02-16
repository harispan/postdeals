from django.conf.urls import include, url
from votes import urls
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import verify_jwt_token

urlpatterns = [

    url(r'^create_user/$', views.create_user, name="create_user"),
    # get all deals
    url(r'^deals/$', views.ListCreateDeal.as_view(), name='deal_list'),
    # get specific deal
    url(r'^deals/(?P<deal_pk>\d+)$',
        views.ListCreateSpecificDeal.as_view(), name='specific_deal'),
    url(r'^voting/', include(urls)),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),


    # url(r'^reviews/(?P<deal_pk>\d+)$',
    #     views.ListCreateReview.as_view(), name='review_list'),
    # url(r'^reviews/review/(?P<review_pk>\d+)$',
    #     views.ListCreateSpecificReview.as_view(), name='specific_review'),
    # url(r'^$',views.index,name="index"),
    # url(r'^login/$', views.login, name="login"),
]




