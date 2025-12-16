from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from .serializers import ProductSerializer


# 1. API to Create a Product (Seller Dashboard)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def create_product_api(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        from django.contrib.auth.models import User

        user = User.objects.first()
        serializer.save(seller=user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# 2. API to List all Products (Customer View) <--- This was missing!
@api_view(["GET"])
def list_products_api(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
