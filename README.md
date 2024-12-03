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


