# Makeup Products API (RESTful Service)

## Overview
**Makeup Products API** is a production-ready RESTful API built with **Node.js** and **Express.js**. 
The application provides robust backend services for managing a makeup products catalog and user management, featuring secure JWT authentication, data validation, encrypted password storage, advanced querying (filtering, sorting, and pagination), and persistent data management in a cloud-hosted **MongoDB Atlas Cluster**. 

Additionally, the project includes a clean documentation front-end interface built with HTML & CSS to easily visualize and navigate the API ecosystem.

## Live Demo
You can explore the live API and its built-in documentation here:
[https://node-project-zmfr.onrender.com/]
*(Note: Hosting on Render's free tier may take a few seconds to spin up)*

---

## Key Project Features
* **User Authentication & Profiles:** Secure login and registration with token-based JWT authorization and profile info retrieval.
* **Password Hashing:** Industry-standard secure password storage using `bcrypt`.
* **Advanced Querying & Filtration:** Server-side product filtration by name (search), category, and custom price ranges (Min/Max).
* **Server-Side Pagination & Sorting:** Built-in pagination limiting outputs to 10 products per page with custom sorting capabilities (by Price, ID, Name, or Category).
* **Data Validation:** Request payload and schema validation via `Joi`.
* **Role-Based & Ownership Security:** Strict route protection ensuring users can only modify/delete their own resources, alongside global Admin control.
* **REST API Architecture:** Structured controllers, models, and routes configuration.

---

## API Architecture & Documentation

### Users Router (`/users`)

| Method | Endpoint | Body (JSON) | Description | Access Control |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/users` | None | Get all registered users information | **Admin Only** (via Token) |
| **GET** | `/users/myInfo` | None | Retrieve current user's profile info | **Authenticated User** |
| **POST** | `/users` | `firstName`, `lastName`, `address`, `email`, `password` | Register a new user to the database | Public |
| **POST** | `/users/login` | `email`, `password` | Authenticate user; returns a JWT token | Public |
| **PUT** | `/users/:idEdit` | `firstName`, `lastName`, `address`, `email`, `password` | Update user data by ID | Owner / Admin |
| **DELETE**| `/users/:idDel` | None | Delete user data by ID | Owner / Admin |

### Makeup Products Router (`/makeupprods`)

> **Global Query Attributes for GET requests:**
> * `Page`: Select page number.
> * `PerPage`: Select quantity of objects per page (Default: 10 per page).
> * `Sort`: Sort data dynamically by `Price` / `ID` / `Name` / `Cat`.
> * `Reverse`: Toggle sort direction.

| Method | Endpoint | Body (JSON) | Description | Access Control |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/makeupprods/` | None | Get all makeup products | Public |
| **GET** | `/makeupprods/single/:id` | None | Get a single product by its unique ID | Public |
| **GET** | `/makeupprods/search?s=name` | None | Search and filter products by name | Public |
| **GET** | `/makeupprods/category/:catName` | None | Get products filtered by category | Public |
| **GET** | `/makeupprods/price/?max=150&min=1`| None | Filter products within a specified price range | Public |
| **POST** | `/makeupprods/` | `name`, `price`, `model`, `brand`, `category` | Add a new makeup product | **Authenticated User** |
| **PUT** | `/makeupprods/:idEdit` | `name`, `price`, `model`, `brand`, `category` | Update product by ID | Product Creator / Admin |
| **DELETE**| `/makeupprods/:idDel` | None | Delete product by ID | Product Creator / Admin |

---

## Technologies & Dependencies

| Package / Tool | Purpose |
| :--- | :--- |
| **Node.js & Express.js** | Core server runtime and Web REST framework |
| **MongoDB & Mongoose** | NoSQL Database and Object Data Modeling (ODM) |
| **JSON Web Token (JWT)** | Secure state-less user authentication |
| **bcrypt** | Secure password hashing |
| **Joi** | Request body validation schemas |
| **Axios** | Handling HTTP requests |
| **dotenv** | Environment-based configurations management |
| **CORS** | Enabling Cross-Origin Resource Sharing |
| **HTML5 & CSS3** | Front-end UI for the API interactive documentation |

---

## Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hadar97/NodeProject.git
   cd NodeProject

```

2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables Configuration:**
Create a `.env` file in the root directory:
```env
USER_DB=<my_mongodb_cluster_username>
PASS_DB=<my_mongodb_cluster_password>
TOKEN_SECRET=<my_secure_jwt_secret_key>
PORT=3001

```


4. **Running the Project:**
```bash
npm start

```


The server will run locally on: `http://localhost:3001`

---

## Deployment

The application is continuously deployed and hosted on **Render**:
https://node-project-zmfr.onrender.com/

---

## Author

**Hadar Ochana** * M.Sc. Computer Science Student

* Software Developer

```

```