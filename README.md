# Tambola Ticket

## Endpoints

### POST /api/user/signup

- **Description**: register a user
- **Method**: POST
- **Request**: JSON
- **Response**: JSON
- **Body**: name,email,password

### POST /api/user/login

- **Description**: login
- **Method**: POST
- **Request**: JSON
- **Response**: token
- **Body**: email,password

### POST /api/ticket

- **Description**: create ticket
- **Method**: POST
- **Response**: ticket ids
-- **Headers**: token
- **Body**: numTickets

### POST /api/:id

- **Description**: get ticket
- **Method**: GET
- **Response**: tickets
- **Headers**: token
- **params**: id(ticket id)


