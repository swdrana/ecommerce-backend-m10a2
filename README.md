# E-commerce API with Express and TypeScript

This project is an e-commerce API developed using Express and TypeScript, integrated with MongoDB using Mongoose. The API supports product and order management with robust data validation using Zod.

## Features

- Create, read, update, and delete products.
- Create and read orders.
- Search for products by name.
- Automatic inventory management when orders are created.
- Data validation using Zod.

## Technologies Used

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **MongoDB**: NoSQL database for storing products and orders.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Zod**: TypeScript-first schema declaration and validation library.

## Project Structure
```
src/
│
├── modules/
│   ├── products/
│   │   ├── product.controller.ts
│   │   ├── product.interface.ts
│   │   ├── product.model.ts
│   │   ├── product.services.ts
│   │   ├── product.validation.ts
│   ├── orders/
│   │   ├── order.controller.ts
│   │   ├── orders.interface.ts
│   │   ├── order.model.ts
│   │   ├── order.services.ts
│   │   ├── order.validation.ts
│
├── .env ──< PORT, MONGO_URL >──
├── app.ts
├── server.ts
└── config/
    ├── index.ts
```


## API Endpoints

### Product Management

1. **Create a New Product**
   - **Endpoint**: `/api/products`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "name": "iPhone 13",
       "description": "A sleek and powerful smartphone with cutting-edge features.",
       "price": 999,
       "category": "Electronics",
       "tags": ["smartphone", "Apple", "iOS"],
       "variants": [
         {
           "type": "Color",
           "value": "Midnight Blue"
         },
         {
           "type": "Storage Capacity",
           "value": "256GB"
         }
       ],
       "inventory": {
         "quantity": 50,
         "inStock": true
       }
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Product created successfully!",
       "data": {
         "name": "iPhone 13",
         "description": "A sleek and powerful smartphone with cutting-edge features.",
         "price": 999,
         "category": "Electronics",
         "tags": ["smartphone", "Apple", "iOS"],
         "variants": [
           {
             "type": "Color",
             "value": "Midnight Blue"
           },
           {
             "type": "Storage Capacity",
             "value": "256GB"
           }
         ],
         "inventory": {
           "quantity": 50,
           "inStock": true
         }
       }
     }
     ```

2. **Retrieve a List of All Products**
   - **Endpoint**: `/api/products`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Products fetched successfully!",
       "data": [
         {
           "name": "iPhone 13",
           "description": "A sleek and powerful smartphone with cutting-edge features.",
           "price": 999,
           "category": "Electronics",
           "tags": ["smartphone", "Apple", "iOS"],
           "variants": [
             {
               "type": "Color",
               "value": "Midnight Blue"
             },
             {
               "type": "Storage Capacity",
               "value": "256GB"
             }
           ],
           "inventory": {
             "quantity": 50,
             "inStock": true
           }
         },
         {
           "name": "Samsung Galaxy S21",
           "description": "High-performance Android smartphone with advanced camera capabilities.",
           "price": 799,
           "category": "Electronics",
           "tags": ["smartphone", "Samsung", "Android"],
           "variants": [
             {
               "type": "Color",
               "value": "Phantom Black"
             },
             {
               "type": "Storage Capacity",
               "value": "128GB"
             }
           ],
           "inventory": {
             "quantity": 30,
             "inStock": true
           }
         }
       ]
     }
     ```

3. **Retrieve a Specific Product by ID**
   - **Endpoint**: `/api/products/:productId`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Product fetched successfully!",
       "data": {
         "name": "iPhone 13",
         "description": "A sleek and powerful smartphone with cutting-edge features.",
         "price": 999,
         "category": "Electronics",
         "tags": ["smartphone", "Apple", "iOS"],
         "variants": [
           {
             "type": "Color",
             "value": "Midnight Blue"
           },
           {
             "type": "Storage Capacity",
             "value": "256GB"
           }
         ],
         "inventory": {
           "quantity": 50,
           "inStock": true
         }
       }
     }
     ```

4. **Update Product Information**
   - **Endpoint**: `/api/products/:productId`
   - **Method**: `PUT`
   - **Request Body**:
     ```json
     {
       "name": "iPhone 13",
       "description": "A sleek and powerful smartphone with cutting-edge features.",
       "price": 999,
       "category": "Electronics",
       "tags": ["smartphone", "Apple", "iOS"],
       "variants": [
         {
           "type": "Color",
           "value": "Midnight Blue"
         },
         {
           "type": "Storage Capacity",
           "value": "256GB"
         }
       ],
       "inventory": {
         "quantity": 50,
         "inStock": true
       }
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Product updated successfully!",
       "data": {
         "name": "iPhone 13",
         "description": "A sleek and powerful smartphone with cutting-edge features.",
         "price": 999,
         "category": "Electronics",
         "tags": ["smartphone", "Apple", "iOS"],
         "variants": [
           {
             "type": "Color",
             "value": "Midnight Blue"
           },
           {
             "type": "Storage Capacity",
             "value": "256GB"
           }
         ],
         "inventory": {
           "quantity": 50,
           "inStock": true
         }
       }
     }
     ```

5. **Delete a Product**
   - **Endpoint**: `/api/products/:productId`
   - **Method**: `DELETE`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Product deleted successfully!",
       "data": null
     }
     ```

6. **Search for Products**
   - **Endpoint**: `/api/products?searchTerm=iphone`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Products matching search term 'iphone' fetched successfully!",
       "data": [
         {
           "name": "iPhone 13 Pro",
           "description": "The latest flagship iPhone model with advanced camera features.",
           "price": 999,
           "category": "Smartphones",
           "tags": ["iPhone", "Apple", "Mobile"],
           "variants": [
             {
               "type": "Color",
               "value": "Graphite"
             },
             {
               "type": "Storage",
               "value": "256GB"
             }
           ],
           "inventory": {
             "quantity": 50,
             "inStock": true
           }
         },
         {
           "name": "iPhone SE",
           "description": "Compact and affordable iPhone model with powerful performance.",
           "price": 399,
           "category": "Smartphones",
           "tags": ["iPhone", "Apple", "Mobile"],
           "variants": [
             {
               "type": "Color",
               "value": "White"
             },
             {
               "type": "Storage",
               "value": "128GB"
             }
           ],
           "inventory": {
             "quantity": 20,
             "inStock": true
           }
         }
       ]
     }
     ```

### Order Management

1. **Create a New Order**
   - **Endpoint**: `/api/orders`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "email": "level2@programming-hero.com",
       "productId": "5fd67e890b60c903cd8544a3",
       "price": 999,
       "quantity": 1
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Order created successfully!",
       "data": {
         "email": "level2@programming-hero.com",
         "productId": "5fd67e890b60c903cd8544a3",
         "price": 999,
         "quantity": 1
       }
     }
     ```

2. **Retrieve All Orders**
   - **Endpoint**: `/api/orders`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Orders fetched successfully!",
       "data": [
         {
           "email": "level2@programming-hero.com",
           "productId": "5fd67e890b60c903cd8544a3",
           "price": 999,
           "quantity": 1
         }
         // more orders...
       ]
     }
     ```

3. **Retrieve Orders by User Email**
   - **Endpoint**: `/api/orders?email=level2@programming-hero.com`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Orders fetched successfully for user email!",
       "data": [
         {
           "email": "level2@programming-hero.com",
           "productId": "5fd67e890b60c903cd8544a3",
           "price": 999,
           "quantity": 1
         }
         // more orders for the user...
       ]
     }
     ```

___
---

# Thank You for visit my repo. 
## Get more update follow: https://facebook.com/swdrana

---