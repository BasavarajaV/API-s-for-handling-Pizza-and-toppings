Assumptions:

1. Used express framework and MongoDB database
2. asuumed that user authentication and authorization
3. Assumed that choose pizza and topping as pushing them into user cart
4. hard coded the Admin and user data for choosing pizza and toppings api

Routings:
A. to get user data--> http://localhost:8000/api/addUser ->POST
B. To get Admin data--> http://localhost:8000/api/addAdmin -> POST

1. Api to create pizza--> http://localhost:8000/api/pizza/create -> POST
2. Api to get all pizza--> http://localhost:8000/api/allPizzas -> GET
3. Api to create toppings--> http://localhost:8000/api/toppings/create -> POST
4. Api to get all topiings--> http://localhost:8000/api/allToppings -> GET
5. Api to Assign price for pizza--> http://localhost:8000/api/pizza/assignPrice/:pizzaId -> PUT
6. Api to assign price for topppings--> http://localhost:8000/api/toppings/assignPrice/:toopingId -> PUT
7. Api to get available pizza--> http://localhost:8000/api/availalblePizzas -> GET
8. Api t0 get availbale toppings--> http://localhost:8000/api/availalblePizzas -> GET
9. Api to choose pizza and toppings(pushing into user.cartlist)-->
   for pizza:http://localhost:8000/api/pizza/:userId/:pizzaId ->GET
   for toppings: for pizza:http://localhost:8000/api/pizza/:userId/:toppingId -> GET
10. Api to get total cost --> http://localhost:8000/api/totalcost/:userId -> GET
