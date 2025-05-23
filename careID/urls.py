"""careID URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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

from django.contrib import admin
from django.urls import path, include
from users.urls import router as UserRouter
from users.views import Logout, UserGetByHashView

urlpatterns = [
    path("admin/", admin.site.urls),
]

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns += [
    path("", include(UserRouter.urls)),
]

urlpatterns += [
    # Custom logout route
    path("logout/", Logout.as_view(), name="logout"),
]

urlpatterns += [
    path("user/get-by-hash/", UserGetByHashView.as_view(), name="user-get-by-hash"),
]
