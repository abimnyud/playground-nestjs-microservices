# NestJS Microservices Monorepo

This monorepo contains a simple example of a microservices architecture using NestJS.

## Project Overview

The project consists of three main parts:

*   **Gateway:** An API Gateway that acts as a single entry point for all client requests.
*   **Auth Service:** A microservice responsible for user authentication and authorization.
*   **Product Service:** A microservice responsible for managing products.

## Getting Started

1.  Install dependencies for each service:

    ```bash
    cd gateway && npm install
    cd ../services/auth && npm install
    cd ../../services/product && npm install
    cd ../../
    ```

2.  Run the `proto:all` script in the `gateway` service to generate the protobuf files:

    ```bash
    cd gateway && npm run proto:all && cd ..
    ```

3.  Run the services using Docker Compose:

    ```bash
    docker-compose up -d
    ```

## Services

### Gateway

The Gateway service is responsible for:

*   Exposing a public API to the client.
*   Forwarding requests to the appropriate microservice.
*   Handling authentication and authorization.

### Auth Service

The Auth service is responsible for:

*   User registration.
*   User login.
*   Token validation.

### Product Service

The Product service is responsible for:

*   Creating products.
*   Retrieving products.
*   Updating products.
*   Deleting products.

## Controllers

### Gateway

*   `gateway/src/auth/auth.controller.ts`
*   `gateway/src/health-check/health-check.controller.ts`
*   `gateway/src/product/product.controller.ts`

### Auth Service

*   `services/auth/src/auth/auth.controller.ts`

### Product Service

*   `services/product/src/product/product.controller.ts`

## Interaction Diagram

```
+-----------+      +----------------+      +----------------+
|           |      |                |      |                |
|  Client   +----->+    Gateway     +----->+  Auth Service  |
|           |      |                |      |                |
+-----------+      +-------+--------+      +-------+--------+
                           |                        |
                           |                        v
                           |                +----------------+
                           |                |                |
                           |                |    Database    |
                           |                |                |
                           |                +-------+--------+
                           |                        ^
                           v                        |
                   +----------------+               |
                   |                |               |
                   | Product Service+---------------+               
                   |                |
                   +----------------+
```

## Contributing

We welcome contributions to this project! If you'd like to add your own service using a different library, framework, or language, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new directory for your service** under the `services` directory.
3.  **Add your service's configuration** to the `docker-compose.yml` file.
4.  **Develop your service.**
5.  **Submit a pull request.**

### Disclaimer

This project is heavily reliant on Docker for service orchestration. It is not configured to be run altogether directly from multiple terminals or a tool like `tmux`. Please ensure you have Docker and Docker Compose installed and running before proceeding.
