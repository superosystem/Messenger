# Messenger Server

## How it works

1. Clone the repository
2. Install dependencies

    ```bash
    make deps || go mod tidy
    ```
3. Configure environment variables on `.env`
4. Make Swagger
    ```bash
    make swag
    ```
5. Run 
    ```bash
    make run
    ```
