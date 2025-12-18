from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Product(models.Model):
    # Link the product to the person selling it
    seller = models.ForeignKey(User, on_delete=models.CASCADE)

    # Basic Details
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)  # blank=True makes this field optional

    # Money - Always use DecimalField, never FloatField!
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Images - Requires Pillow Library installed
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)

    # Inventory
    stock = models.PositiveSmallIntegerField(default=1)

    # Timstamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}  (GHS {self.price})"


class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=15)  # For Momo payment
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(
        default=False
    )  # Hubtel will update this to True once payment is confirmed
    date_ordered = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return f"Order of {self.product.name} by {self.customer_name}"