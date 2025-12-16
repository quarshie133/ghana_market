from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from store.views import create_product_api, list_products_api


urlpatterns = [
    # 1. Admin Panel
    path("admin/", admin.site.urls),
    
    # 2. Customer View (List products)
    path("api/products/", list_products_api, name="list_products_api"),
    
    # 3. Seller View (Create product)
    path("api/products/create/", create_product_api, name="create_product_api"),
]

# This allows images to load during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
