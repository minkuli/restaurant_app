# restaurant-backend requirements

source /env/bin/activate 

pip install django djangorestframework

cd backend

python manage.py migrate

python manage.py runserver


# restaurant-client-app and restaurant-staff-app requirements

Both apps need packages to be installed

npm install

npm start

# restaurant-backend usage

It is also important to make superuser in order to use django admin:
python manage.py createsuperuser

Login to admin with your credentials and add items to the Menu items tab. Menu items should have: name, price, category. Description is arbitrary.

Menu can be seen under /menu endpoint.

# restaurant-client-app usage

When client app is started, user shows homepage which is menu. Then user can choose between several food and drink items and add them to cart.

Clicking on cart icon user can see what is inside the cart and eventually add or remove some items, and then finish when satisfied by clicking Order.

Message Successfully sent order is shown, clicking on close, Order summary is shown on screen. 

Clicking Go to Menu button user can remove order summary from screen.

# restaurant-staff-app usage

When staff app is started, user shows login form on the screen. User can login as Waiter, Chef or Barman. Please be aware that words are capitalized.

Barman sees drinks from the last order and checkbox drinks, first click on it means that drink is being prepared and second click means that drink is prepared.
Chef sees food from the last order and checkbox food, first click on it means that food is being prepared and second click means that food is prepared.
Waiter sees the whole order. Everybody can see notifications in navbar. 

Waiter checks for the notifications that food and drink are prepared and after he sees that, he can click the deliver button in Dashboard. 
Click on it alerts that the the order is delivered.





