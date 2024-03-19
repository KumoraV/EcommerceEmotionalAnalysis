from django.shortcuts import render
from rest_framework import generics, status
from .serializers import ProductSerializer, CreateProductSerializer, UserSerializer, CreateUserSerializer, ReviewSerializer, CreateReviewSerializer
from .models import Product, User,Review
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here. This is where you define what happends to the data.

#----------------------------------------------
# PRODUCT VIEWS
#----------------------------------------------
# View to show all products
class ProductView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# View to show a single product
class SingleProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

# View to create a new product. 
# Takes a POST request with parameters: name, description, price
class CreateProductView(APIView):
    serializer_class = CreateProductSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new product
        if serializer.is_valid():
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            price = serializer.data.get('price')
            product = Product(name=name, description=description, price=price)
            product.save()
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
#----------------------------------------------
# USER VIEWS
#----------------------------------------------
# View to show all users
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# View to create a new user.
# Takes a POST request with parameters: name, email, password, address, phone
class CreateUserView(APIView):
    serializer_class = CreateUserSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new user
        if serializer.is_valid():
            name = serializer.data.get('name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            address = serializer.data.get('address')
            phone = serializer.data.get('phone')
            user = User(name=name, email=email, password=password, address=address, phone=phone)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)    

#----------------------------------------------
# REVIEW VIEWS
#----------------------------------------------
# View to show all reviews of a product
class ReviewView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# View to show reviews of a single product
class ProductReviewView(APIView):
    serializer_class = ReviewSerializer
    lookup_url_kwarg = 'product'
    def get(self, request, format=None):
        product = request.GET.get(self.lookup_url_kwarg)
        if product != None:
            reviews = Review.objects.filter(product__id=product)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Product ID not found in request'}, status=status.HTTP_400_BAD_REQUEST)
                        
# View to create a new review for a product
# Takes a POST request with parameters: product, name, rating, comment, emotion
class CreateReviewView(APIView):
    serializer_class = CreateReviewSerializer
    # Define the post method
    def post(self, request, format=None):
        # Get the data from the request
        serializer = self.serializer_class(data=request.data)
        # If the data is valid, create a new review
        if serializer.is_valid():
            product = serializer.data.get('product')
            user = serializer.data.get('user')
            rating = serializer.data.get('rating')
            comment = serializer.data.get('comment')
            emotion = serializer.data.get('emotion')
            review = Review(product=product, user=user, rating=rating, comment=comment, emotion=emotion)
            review.save()
            return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)