
from scipy.fftpack import ss_diff
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse

import json
from django.core.paginator import EmptyPage, Paginator, PageNotAnInteger
import requests
from django.contrib.auth.decorators import login_required
#from .models import User
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings


from django.shortcuts import render


# Create your views here.
@login_required
def home(request):    

    return render(request,"home.html")