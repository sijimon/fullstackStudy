Make sure Node is installed on your local 
>node -v
version worked on 18.16.0
----------------------------------------------------------
Install Angular CLI

>npm i @angular/cli@16.1.6 --location=global

>ng v 
# Check version

---------------------------------------------------------
Create new Angular Application 

>ng new <application-name> appointment-app 
# ignore routig for this press N and css default

# run the ng app from app folder and -o open in new browser 
> ng serve -o; ng serve --open

# Create a Component
>ng generate component <component-name>appointment-list
or
>ng g c <component-name>

# Create a Service
>ng generate service <service-name>
or
ng g s <service-name> 

#Build your application for production, create a dist/folder with output

>ng build

# check application for outdated dependencies or also to update
>ng update



>ng generate interface models/appointment
---------------------------------------------------------

# Install Bootstrap local to project 
npm install bootstrap@5.3

# add below line to styles.css file in src folder
@import "~bootstrap/dist/css/bootstrap.min.css";


--------------------------------------------------------------


# Generate Module

>ng generate module home
# create and attach home module to home component
>ng generate component home --module=home

-------------------------------------------------------------

# Create new project for animal-paintings-shop
ng new animal-paintings-shop [y for routing and default css]

# generate a product module
ng generate module product

# generate product service and connect to the product module
ng generate service product/product

# generate product-list component and connect with the product module
ng generate component product/product-list

# in app.module.ts import ProductModule , HttpClientModule

# create a new class product 
ng generate class modules/product
# [You can either use a class or interface. Typically you want to use an interface. As a general rule of thumb: As long as you don't have to create an instance of a specific type, pick an interface over a class.]

# update app-routing-module.ts 

# generate environments config file
ng generate environments
# [add mockoon url parameter; apiUrl: 'http://localhost:3000']
# start server with configuration 
ng serve --configuration=development

# Angular Meterial 
ng add @angular/material

# Apply Angular Meterial style by adding belo line in style.css @import "~@angular/material/prebuilt-themes/indigo-pink.css";

# Add Angular Flex Layout
npm i -s @angular/flex-layout @angular/cdk


# Update product-list component css for transform and transition

# Add navigation bar using toolbar from Angular Meterial

# Create new Cart module and service
ng g module cart
ng g service cart/cart
ng g component cart/cart-view

