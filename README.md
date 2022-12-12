# Gym-Equipment

<img alt="gym-equipment" src="https://res.cloudinary.com/dyexk2s2s/image/upload/v1670766384/Screenshot_2022-12-11_144105_bkia1k.png" />
<img alt="gym-equipment" src="https://res.cloudinary.com/dyexk2s2s/image/upload/v1670766862/Screenshot_2022-12-11_144231_koumai.png" />
<img alt="gym-equipment" src="https://res.cloudinary.com/dyexk2s2s/image/upload/v1670766384/Screenshot_2022-12-11_144314_stfesx.png" />
<br/>

## Live-demo

**[Gym-Equipment](https://gym-equipment.onrender.com/)**

## Installation and usage
 
**Clone respository:**
 
 ```
https://github.com/KumanStoykov/gym-equipment
 ```
 
 * To run client app
   <br/>
 ```
    cd client 
    npm install
    ng serve
 ```
 * To run server app
    <br/>
 ```
    cd server
    npm install
    npm run dev
 ```
 
 <br/>
 
 
## :pencil2: Application Overview

This is a sample application that demonstrates an E-commerce website using the MEAN stack. The application loads products a MongoDB database and displays them. Users can select to display products in a single category. Users can click on any product to get more information including pricing, reviews and rating. Users can select items and add them to their shopping cart.
Guest and logged-in users can save products to wishlist (favorites) or cart and can make orders.
Guest users may register with an email and password which allows them to view their own profile by clicking [Account -> Your Profile] in the navigation bar and the opportunity to edit their own profile information. Also can access their own orders page and add review to the products. Admin users can access the "Administrator" menu and they can create a new product, update users and orders information.

<br/>

| **Permissions** | Guest  | Logged in User | Admin  |
| --------------- | -----  | -------------- | -----  |
| Login/ Register | ✔️      | ❌             | ❌    |
| Home page       | ✔️      | ✔️              |  ✔️     |
| Details         | ✔️      | ✔️              |  ✔️     |
| Cart            | ✔️      | ✔️              |  ✔️     |
| Favorites       | ✔️      | ✔️              |  ✔️     |
| Checkout        | ✔️      | ✔️              |  ✔️     |
| Profile         | ❌     | ✔️              |  ✔️     |
| My Orders       | ❌     | ✔️              |  ✔️     |
| Create Product  | ❌     | ❌             |  ✔️    |
| Admin Users     | ❌     | ❌             |  ✔️    |
| Admin Orders    | ❌     | ❌             |  ✔️    |
| Admin Products  | ❌     | ❌             |  ✔️    |

# :computer:  Built With

## Back-end

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Cookie Parser](https://github.com/expressjs/cookie-parser)
- [Cors](https://github.com/expressjs/cors)
- [Nodemon](https://github.com/remy/nodemon)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Cloudinary](https://github.com/cloudinary/cloudinary_npm)

## Front-end

- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [SCSS](https://sass-lang.com/)
- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Rxjs](https://rxjs.dev/guide/overview)
- [NgRx Store](https://ngrx.io/guide/store)
- [NgRx Effects](https://v10.ngrx.io/guide/effects)
- [NgRx Devtools](https://ngrx.io/guide/store-devtools)
- [Font Awesome](https://fontawesome.com/v5/docs/web/use-with/angular)


## Deployment
**[RENDER](https://render.com/)**
