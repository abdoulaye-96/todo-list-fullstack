#  Fullstack To-Do List Application

This is a fullstack web application that allows users to manage their daily tasks efficiently.

The project was built as part of an academic assignment, with a focus on clean architecture and best development practices.

---

## Tech Stack

### Backend
- Spring Boot (REST API)
- Spring Data JPA
- PostgreSQL

### Frontend
- React (Vite)
- TailwindCSS
- Axios

---

##  Features

1- Create a task  
2-  Update a task  
3- Delete a task  
4- View all tasks  
5- Mark a task as completed  

---

##  Architecture

The backend follows a layered architecture:

- Controller → handles HTTP requests  
- Service → business logic  
- Repository → database access  
- DTO → data transfer between layers  
- Mapper → converts Entity ↔ DTO  

This ensures:
- Clean code  
- Maintainability  
- Scalability  

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST   | /api/tasks        | Create a task |
| GET    | /api/tasks        | Get all tasks |
| PUT    | /api/tasks/{id}   | Update a task |
| DELETE | /api/tasks/{id}   | Delete a task |
| PATCH  | /api/tasks/{id}/done | Mark as completed |

---

##  Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
