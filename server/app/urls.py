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




# ---------------------------post a deal with jwt
# curl -X POST \
#    http://localhost:8000/api/v1/deals/ \
#    -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6Imp3dCIsImV4cCI6MTUxNDMxODM0MiwiZW1haWwiOiIifQ.cCaahcWMsdF-tXVJydTrAwDcYzB8QROccJ2UyaDPVl4'\
#    -H 'cache-control: no-cache' \
#    -H 'content-type: application/json' \
#   -d '{
#     "title": "test apo bash",
#      "url": "http://getblimp.github.io/django-rest-framework-jwt/"
#  }'
# ---------------------------Login
# curl --request POST \
#   --url http://localhost:8000/api/v1/login/ \
#   --header 'content-type: application/json' \
#   --data '{"username": "nulis1", "password": "123454"}'

# ---------------------------Register
# curl --request POST \
#   --url http://localhost:8000/api/v1/create_user/ \
#   --header 'content-type: application/json' \
#   --data '{"username": "nulis1", "password": "123454"}'

# -------------------------- working submition for a deal

# curl -X POST \
#   http://localhost:8000/api/v1/reviews/7 \
#   -H 'authorization: Token 817d060e6d243fd744cdb928b93fb1839cec291d' \
#   -H 'cache-control: no-cache' \
#   -H 'content-type: application/json' \
#   -d '{
#     "name": "dadadada",
#     "email": "adw@mail.com",
#     "comment": "daw",
#     "rating": 5,
#     "deal": 7
# }'


# --------------------------NOT working submition for a deal
# curl --request POST \
#   --url http://localhost:8000/api/v1/deals/ \
#   --header 'content-type: application/json' "Authorization: Token 5e2effff34c85c11a8720a597b96d73a4634c9ad" \
#   --data '{"title": "curl x","url": "http://localhost:8000/api/v1/deals/"}'