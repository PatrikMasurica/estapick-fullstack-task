# estapick-fullstack-task
This is the fullstack assignment from Estapick project.
1. Project Overview
This is a full-stack application built with a separated architecture:

Frontend: React / Next.js (client application)
Backend: NestJS (API server)
Database: PostgreSQL with Prisma ORM
The system follows a standard client–server architecture:

The frontend communicates with the backend via REST API requests
The backend handles business logic and validation
The database stores all persistent data, managed through Prisma
2. How the System Works
User interacts with the frontend UI (e.g. creating or viewing listings)
Frontend sends HTTP requests to backend API (NestJS)
Backend processes requests, validates data, and uses Prisma ORM
Prisma communicates with PostgreSQL database
Response is returned back to frontend and displayed to the user
3. How to Run the Project Locally
3.1 Backend Setup (NestJS)
cd api
npm install
Configure environment variables:
Create a .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
or you can use mine 


DATABASE_URL="postgresql://postgres:patrikmasurica@localhost:5432/estapick_db?schema=public"


Run backend:
npm run start:dev
Backend will run on:

http://localhost:3001
3.2 Database Setup (Prisma)
Run Prisma migrations:

npx prisma migrate dev
(Optional) Open Prisma Studio:

npx prisma studio
3.3 Frontend Setup (React/Next.js)
cd client
npm install
npm run dev
Frontend will run on:

http://localhost:3000 
4. Project Structure
project-root/
 ├── api/        (NestJS backend)
 ├── client/     (Frontend application)
 ├── prisma/     (Database schema & config)
5. Key Features Implemented
REST API with NestJS controllers and services
Prisma ORM integration with PostgreSQL
Modular backend architecture (Listings module, Prisma module)
Frontend connected to backend API
Basic CRUD operations (create/read/update/delete listings)
Error handling and validation on backend
6. AI Tools Used
During development, I used AI tools to improve productivity and debugging efficiency:

ChatGPT (OpenAI):
Helped debug TypeScript and Prisma configuration issues
Assisted in structuring NestJS modules and services
Supported in explaining errors and suggesting fixes
Helped generate README documentation
GitHub Copilot (if applicable):
Assisted with boilerplate code and repetitive patterns
AI tools were used strictly as development assistance, while all architecture decisions and implementation logic were understood and applied manually.

7. Final Notes
The project is fully functional and structured in a scalable way using modern full-stack practices. It can be easily extended with authentication, advanced validation, and deployment configurations.