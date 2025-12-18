from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from .serializers import ProductSerializer
from .models import Order


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


@api_view(["POST"])
def create_order_api(request):
    # 1. Get data from frontend
    product_id = request.data.get("product_id")
    customer_name = request.data.get("customer_name")
    customer_phone = request.data.get("customer_phone")

    # 2. Find the product
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    # 3. Create the Order (Initially Unpaid)
    order = Order.objects.create(
        product=product,
        customer_name=customer_name,
        customer_phone=customer_phone,
        amount=product.price,
        is_paid=False,  # Default is False
    )

    # 4. SIMULATE HUBTEL PAYMENT (The Mock Part)
    order.is_paid = True
    order.save()

    return Response(
        {
            "message": "Payment successful",
            "order_id": order.id,
            "amount_paid": (order.amount),
        },
        status=201,
    )
