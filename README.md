# Kasa

Kasa is a web application that allows users to browse and manage rental accommodations.
This web application contains database (sqlite3) which is used to store message between users.

## Getting Started

### Backend setup

First, you need to set up and run the backend server:

https://github.com/OpenClassrooms-Student-Center/dev-react-P12

Follow the instructions provided in the repository to install and start the backend server.

### Database SQLITE3
The database is located in the database folder with the name "message.sqlite" and contains
a table named messages with the following columns:

- id: integer primary key 
- text: text
- expediteur: integer
- receveur: integer
- date: Datetime

### Environment variables

Create a `.env.local` file in the root directory of the Kasa project.

The file must contain the same `JWT_SECRET` value as the backend server, or use the default value:

```bash
JWT_SECRET="change-me-in-prod"
```
and also contain :

```bash
BACKEND_PUBLIC="localhost"
BACKEND_PORT="3000"
```
### Install dependencies

Install the project dependencies:

```bash
npm install
```

### Run the development server

Start the Kasa development server with:

```bash
PORT=3001 npm run dev
```

Open your browser and go to:

http://localhost:3001 to view the application.


## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- JWT authentication
- Better SQLite3

## Project Structure

```text
kasa/
├── app/            # Application pages and routes
├── components/     # Reusable React components
├── contexts/       # React contexts
├── public          # Public images
├── services/       # API communication services
├── types/          # TypeScript interfaces and types
└── utils/          # Utility functions
```

## Documentation

The project code is documented using JSDoc comments for reusable components, services, utilities, and important functions.

## Author

Developed as part of the OpenClassrooms React developer training.