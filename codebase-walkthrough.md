# Codebase Walkthrough: StatusTrack Application

**Audience:** Technical Interviewer, Engineering Manager, Fellow Developers
**Goal:** To demonstrate a deep understanding of the project's architecture, design patterns, and implementation details.

---

## Introduction

"Hello, and thank you for this opportunity. I'm excited to walk you through the codebase of StatusTrack, a full-stack status page application I built.

My goal with this project was to create a robust, scalable, and real-time system using a modern tech stack. The backend is a Python-based FastAPI application, and the frontend is built with Next.js and TypeScript. Let's start with a high-level overview."

---

## High-Level Architecture

*   **Action:** Display a simple architecture diagram (or draw one on a whiteboard).

> "The architecture consists of three main parts:
> 1.  A **Next.js frontend** that serves both the public-facing status pages and the private admin dashboard. It's responsible for all UI rendering and user interaction.
> 2.  A **FastAPI backend** that acts as the central API. It handles business logic, database operations, and user authentication.
> 3.  A **MongoDB database** for persistent data storage, including users, organizations, services, and incidents.

> For real-time functionality, the frontend and backend communicate over **WebSockets**, which allows the server to push live updates to clients instantly. Authentication is handled by **Auth0**, providing a secure and scalable solution."

---

## Backend Deep Dive (FastAPI)

> "Now, let's dive into the backend code. I chose FastAPI for its high performance, asynchronous capabilities, and automatic documentation generation."

*   **Action:** Open the `backend/` directory in your editor.

### **1. Project Structure & Entrypoint**

*   **Action:** Show the `backend/app/` directory structure, then open `app/main.py`.

> "The application follows a modular structure. The main entrypoint is `main.py`. Here, I initialize the FastAPI app, configure CORS middleware to allow requests from the frontend, and mount the main API router. I've also set up startup and shutdown events to manage the database connection pool and the WebSocket manager, ensuring clean resource handling."

### **2. API Routing**

*   **Action:** Open `app/api/v1/api.py` and then navigate to `app/api/v1/endpoints/services.py`.

> "I've organized all API endpoints into modular routers. The main router in `api.py` aggregates individual routers for different resources like services, incidents, and organizations. This keeps the codebase clean and scalable.

> If we look at `services.py`, you can see a standard RESTful implementation. I'm using FastAPI's dependency injection system extensively, for example, to get the database connection and the currently authenticated user. All database operations are asynchronous, leveraging `async/await` syntax throughout the stack to ensure the server remains non-blocking and efficient."

### **3. Database & Data Models**

*   **Action:** Open `app/database/models.py` and `app/schemas/service.py`.

> "For data modeling, I'm using Pydantic. In `schemas/service.py`, I define different schemas for creating, updating, and reading data (`ServiceCreate`, `ServiceUpdate`, `ServiceInDB`). This provides strong data validation and serialization automatically.

> The database interaction is managed through Motor, the official async MongoDB driver. The models in `database/models.py` map directly to MongoDB collections and use these Pydantic schemas, ensuring a consistent data structure between the API and the database."

### **4. Authentication**

*   **Action:** Open `app/auth_utils.py`.

> "Authentication is a critical piece. I've implemented a robust system using Auth0 and JWTs. The `auth_utils.py` file contains the core logic. It has a reusable dependency, `get_current_active_db_user`, which validates the JWT from the `Authorization` header and fetches the corresponding user from our database. This dependency is then used to protect any endpoint that requires an authenticated user, making security declarative and easy to manage."

### **5. Real-time with WebSockets**

*   **Action:** Open `app/websocket/connection_manager.py`.

> "To handle real-time updates, I built a `ConnectionManager` class. This singleton class manages all active WebSocket connections. When an event occurs—like a service status changing—the relevant API endpoint can call the manager's `broadcast` method. This pushes the updated data to all connected clients, who then update their UI in real-time. This decouples the event-triggering logic from the WebSocket management itself."

---

## Frontend Deep Dive (Next.js)

> "Moving to the frontend, I used Next.js with the App Router, which enables a powerful combination of server-side rendering and client-side interactivity."

*   **Action:** Open the `frontend/` directory.

### **1. Project Structure & Routing**

*   **Action:** Show the `frontend/src/app/` directory, highlighting the `[organizationSlug]/status/page.tsx` file.

> "The structure is based on the Next.js App Router. Each folder inside `app` corresponds to a URL segment. For example, the public status page is implemented in `[organizationSlug]/status/page.tsx`. This file contains a React Server Component that fetches the initial data on the server, providing fast initial page loads and good SEO."

### **2. Components & State Management**

*   **Action:** Open `frontend/src/app/[organizationSlug]/status/page.tsx` and a client component it uses, like `ServiceStatusList`.

> "The page is composed of smaller, reusable components. I've intentionally separated Server Components for data fetching and Client Components (marked with `'use client'`) for anything requiring state or effects, like handling user input or WebSocket connections.

> For state management, I'm using React's built-in hooks (`useState`, `useEffect`). In the `ServiceStatusList` component, `useEffect` is used to establish a WebSocket connection when the component mounts. It listens for incoming messages and updates the component's state, which re-renders the UI to show the new service status."

### **3. API Communication & Proxy**

*   **Action:** Open `frontend/next.config.js`.

> "To avoid CORS issues and hide the backend URL from the client, I've configured a proxy in `next.config.js`. All requests from the frontend to `/api/` are automatically proxied to the FastAPI backend running on port 8000. This is a clean and secure way to handle API communication in a full-stack setup."

---

## Conclusion

> "In summary, StatusTrack is a comprehensive application that demonstrates a modern, full-stack development workflow. The key architectural decisions—like using a modular FastAPI backend, a server-rendered Next.js frontend, and WebSockets for real-time updates—were all made to build a system that is performant, scalable, and maintainable.

> Thank you for your time. I'd be happy to answer any questions you have about the implementation."
