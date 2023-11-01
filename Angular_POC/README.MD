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