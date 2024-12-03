# Restaurant Management System

A full-stack restaurant management application built with a Spring Boot backend and an Angular frontend.

## Prerequisites

- **Java** (JDK 11 or higher)
- **MySQL** (8.0 or higher)
- **Maven** (3.6 or higher)
- **Node.js** (16.x or higher)
- **Angular CLI** (12.x or higher)

---

## Deployment Steps

### 1. MySQL Database Setup

1. Create a new MySQL database named `restaurant_db`.
2. Update the `application.properties` file in the `backend/src/main/resources` directory with your MySQL configuration:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/restaurant_db
    spring.datasource.username=yourUsername
    spring.datasource.password=yourPassword
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.format_sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

    # Logging
    logging.level.org.springframework.web=DEBUG
    logging.level.org.hibernate.SQL=DEBUG
    logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
    ```

---

### 2. Backend Setup and Run

1. Navigate to the `backend` directory:

    ```bash
    cd restaurant-management-springboot
    ```

2. Install dependencies and start the backend:

    ```bash
    mvn install
    mvn spring-boot:run
    ```

3. The backend will be running at `http://localhost:8080`.

---

### 3. Frontend Setup and Run

1. Navigate to the `frontend` directory:

    ```bash
    cd ../restaurant-management
    ```

2. Install dependencies and start the frontend:

    ```bash
    npm install
    ng serve
    ```

3. The frontend will be running at `http://localhost:4200`.

---

## Screenshots

### User Login Page
![image](https://github.com/user-attachments/assets/eedb7f2d-90a1-411a-9fae-b733564109ba)
![image](https://github.com/user-attachments/assets/fe9239ed-8ff0-4d9f-965d-9999519649d1)

### User Dashboard
![image](https://github.com/user-attachments/assets/dd3d06ca-938a-4338-94c8-d97c3fa58fba)

### Menu Tab
![image](https://github.com/user-attachments/assets/fd9bcf3d-5dd2-4fd6-8cad-2c2ca2ea458c)

### View Order Tab
![image](https://github.com/user-attachments/assets/55bdf94d-f473-42cd-b6e4-ecc296f3bab0)
### Table Booking Tab
![image](https://github.com/user-attachments/assets/d14c0506-716b-412e-9554-ac7cfe4863cc)

### Admin Login Page
Username: admin
Password: admin
![image](https://github.com/user-attachments/assets/2f3859e6-950f-4ef4-9b78-8863bb062fab)

### Admin Dashboard
![image](https://github.com/user-attachments/assets/1713d4fb-465e-4a93-9f14-9462d5dc847e)

---
