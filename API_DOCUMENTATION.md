# API Reference & Documentation

This document outlines all backend REST API endpoints available in the application, including which frontend components consume them, request headers/parameters/payloads, and exact response formats. It is organized so you can easily reference or copy it to another project.

---

## Table of Contents

1. [Overview & Configuration](#overview--configuration)
2. [Authentication & Headers](#authentication--headers)
3. [Data Models & Types](#data-models--types)
4. [Endpoints Summary](#endpoints-summary)
5. [Portfolio Endpoints](#portfolio-endpoints)
   - [GET /api/portfolio](#1-get-apiportfolio)
   - [GET /api/portfolio/all](#2-get-apiportfolioall)
   - [POST /api/portfolio](#3-post-apiportfolio)
   - [PUT /api/portfolio/:id](#4-put-apiportfolioitem_id)
   - [DELETE /api/portfolio/:id](#5-delete-apiportfolioitem_id)
   - [PATCH /api/portfolio/:id/toggle](#6-patch-apiportfolioitem_idtoggle)
   - [PATCH /api/portfolio/:id/dev](#7-patch-apiportfolioitem_iddev)
   - [PATCH /api/portfolio/reorder](#8-patch-apiportfolioreorder)
6. [Projects Endpoints](#projects-endpoints)
   - [GET /api/projects](#9-get-apiprojects)
   - [GET /api/projects/all](#10-get-apiprojectsall)
   - [POST /api/projects](#11-post-apiprojects)
   - [PUT /api/projects/:id](#12-put-apiprojectsitem_id)
   - [DELETE /api/projects/:id](#13-delete-apiprojectsitem_id)
   - [PATCH /api/projects/:id/toggle](#14-patch-apiprojectsitem_idtoggle)
   - [PATCH /api/projects/:id/dev](#15-patch-apiprojectsitem_iddev)
   - [PATCH /api/projects/reorder](#16-patch-apiprojectsreorder)
7. [System / Health Endpoints](#system--health-endpoints)
   - [GET /api/health](#17-get-apihealth)
8. [Client Integration Snippets](#client-integration-snippets)
   - [Axios Instance Setup](#axios-instance-setup)
   - [Fetch API Helpers](#fetch-api-helpers)

---

## Overview & Configuration

- **Backend Framework:** FastAPI (Python)
- **Data Persistence:** JSON files (`data/portfolio.json`, `data/projects.json`)
- **Default Port:** `8000` (e.g., `http://localhost:8000`)
- **Frontend Environment Variable:** `VITE_API_URL` (configured in `.env` / `src/utils/axios.js`)
- **Special Behavior:**
  - When saving `image`, Google Drive sharing links (`https://drive.google.com/file/d/<id>/...`) are automatically converted to direct viewable image URLs (`https://drive.google.com/uc?export=view&id=<id>`).
  - IDs are auto-generated as UUID strings (`str(uuid.uuid4())`) on creation.
  - Sorting: Public endpoints return only items with `hidden: false`, sorted by `order` ascending.

---

## Authentication & Headers

Protected admin endpoints require the following custom header:

| Header | Type | Description |
| :--- | :--- | :--- |
| `X-Admin-Password` | `string` | Must match the server environment variable `ADMIN_PASSWORD` |

### Error Responses for Auth:
- **Status `401 Unauthorized`**:
  ```json
  {
    "detail": "Unauthorized: invalid password."
  }
  ```

---

## Data Models & Types

### TypeScript Interfaces

```typescript
export interface PortfolioItem {
  id: string;                      // Generated UUID
  title: string;                   // E.g. "Cruise Booking Desk"
  category: string;                // E.g. "React & PostgreSQL"
  image: string;                   // Image URL or path (e.g. "/portfolio/2.png" or Drive link)
  desc: string;                    // Detailed description
  link: string;                    // External project/live URL
  order?: number;                  // Display order (default: 0)
  hidden?: boolean;                // Visibility flag (default: false)
  under_development?: boolean;     // Status badge flag (default: false)
}

export interface ProjectItem {
  id: string;                      // Generated UUID
  title: string;                   // E.g. "CensorAI"
  type: string;                    // E.g. "AI / NLP Moderation System"
  tech: string[];                  // E.g. ["Python", "NLP", "Machine Learning"]
  image: string;                   // Image URL or local asset path
  desc: string;                    // Detailed description
  link: string;                    // GitHub repository or live URL
  order?: number;                  // Display order (default: 0)
  hidden?: boolean;                // Visibility flag (default: false)
  under_development?: boolean;     // Status badge flag (default: false)
}

export interface ReorderRequest {
  ids: string[];                   // Ordered list of item IDs: ["id-1", "id-2", ...]
}
```

---

## Endpoints Summary

| Method | Endpoint | Auth Required | Used By Frontend Component |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/portfolio` | No | `src/components/Portfolio.jsx`, `src/mobile/MobilePortfolio.jsx` |
| `GET` | `/api/portfolio/all` | **Yes** | `src/pages/AdminPanel.jsx` |
| `POST` | `/api/portfolio` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PUT` | `/api/portfolio/{item_id}` | **Yes** | `src/pages/AdminPanel.jsx` |
| `DELETE` | `/api/portfolio/{item_id}` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PATCH` | `/api/portfolio/{item_id}/toggle` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PATCH` | `/api/portfolio/{item_id}/dev` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PATCH` | `/api/portfolio/reorder` | **Yes** | `src/pages/AdminPanel.jsx` |
| `GET` | `/api/projects` | No | `src/components/Projects.jsx`, `src/mobile/MobileProjects.jsx` |
| `GET` | `/api/projects/all` | **Yes** | `src/pages/AdminPanel.jsx` |
| `POST` | `/api/projects` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PUT` | `/api/projects/{item_id}` | **Yes** | `src/pages/AdminPanel.jsx` |
| `DELETE` | `/api/projects/{item_id}` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PATCH` | `/api/projects/{item_id}/toggle` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PATCH` | `/api/projects/{item_id}/dev` | **Yes** | `src/pages/AdminPanel.jsx` |
| `PATCH` | `/api/projects/reorder` | **Yes** | `src/pages/AdminPanel.jsx` |
| `GET` | `/api/health` | No | System health check |

---

## Portfolio Endpoints

### 1. `GET /api/portfolio`
Fetches all **public visible** portfolio items sorted by `order` ascending.

- **Auth Required:** No
- **Query / Body:** None
- **Response `200 OK`:** `Array<PortfolioItem>`
  ```json
  [
    {
      "id": "port-1",
      "title": "Cruise Booking Desk",
      "category": "React & PostgreSQL",
      "image": "/portfolio/2.png",
      "desc": "A large-scale cruise travel booking platform built with React and PostgreSQL.",
      "link": "https://cruisebookingdesk.com",
      "order": 0,
      "hidden": false,
      "under_development": false
    }
  ]
  ```

---

### 2. `GET /api/portfolio/all`
Fetches **all** portfolio items (including hidden) for admin management.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Query / Body:** None
- **Response `200 OK`:** `Array<PortfolioItem>`

---

### 3. `POST /api/portfolio`
Creates a new portfolio entry. Automatically assigns a new `id` (UUID) and normalizes Google Drive image links.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "title": "New Web App",
    "category": "Next.js & Tailwind CSS",
    "image": "https://drive.google.com/file/d/1abc.../view",
    "desc": "Production dashboard application.",
    "link": "https://example.com",
    "order": 0,
    "hidden": false,
    "under_development": false
  }
  ```
- **Response `200 OK`:** Returns the created `PortfolioItem` with generated `id`.

---

### 4. `PUT /api/portfolio/{item_id}`
Updates an existing portfolio entry by ID.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:**
  - `item_id` (`string`): ID of the item to update
- **Request Body:** Same schema as `POST /api/portfolio`
- **Response `200 OK`:** Returns the updated `PortfolioItem`
- **Errors:** `404 Not Found` if item does not exist:
  ```json
  { "detail": "Portfolio item not found." }
  ```

---

### 5. `DELETE /api/portfolio/{item_id}`
Deletes an existing portfolio item by ID.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:**
  - `item_id` (`string`): ID of the item to delete
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "deleted_id": "port-1"
  }
  ```
- **Errors:** `404 Not Found` if item does not exist.

---

### 6. `PATCH /api/portfolio/{item_id}/toggle`
Toggles the `hidden` status (`true` <-> `false`) of a portfolio item.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:** `item_id` (`string`)
- **Request Body:** None / `null`
- **Response `200 OK`:** Returns the updated `PortfolioItem`.

---

### 7. `PATCH /api/portfolio/{item_id}/dev`
Toggles the `under_development` status (`true` <-> `false`) of a portfolio item.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:** `item_id` (`string`)
- **Request Body:** None / `null`
- **Response `200 OK`:** Returns the updated `PortfolioItem`.

---

### 8. `PATCH /api/portfolio/reorder`
Updates the sort order of all portfolio items based on an array of IDs.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Request Body:**
  ```json
  {
    "ids": ["port-2", "port-1", "port-3"]
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true
  }
  ```

---

## Projects Endpoints

### 9. `GET /api/projects`
Fetches all **public visible** personal projects sorted by `order` ascending.

- **Auth Required:** No
- **Query / Body:** None
- **Response `200 OK`:** `Array<ProjectItem>`
  ```json
  [
    {
      "id": "proj-1",
      "title": "CensorAI",
      "type": "AI / NLP Moderation System",
      "tech": [
        "Python",
        "NLP",
        "Machine Learning",
        "Video Processing",
        "AI Moderation"
      ],
      "image": "/project/main.png",
      "desc": "An AI-powered social media moderation prototype that detects and flags hate speech or offensive content in uploaded videos.",
      "link": "https://github.com/Celicular/TechDx404-NLP-censorAI",
      "order": 0,
      "hidden": false,
      "under_development": false
    }
  ]
  ```

---

### 10. `GET /api/projects/all`
Fetches **all** project items (including hidden) for admin management.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Query / Body:** None
- **Response `200 OK`:** `Array<ProjectItem>`

---

### 11. `POST /api/projects`
Creates a new project entry.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "title": "AI Assistant",
    "type": "Conversational Agent",
    "tech": ["Python", "FastAPI", "OpenAI"],
    "image": "https://...",
    "desc": "Full stack LLM application.",
    "link": "https://github.com/...",
    "order": 0,
    "hidden": false,
    "under_development": false
  }
  ```
- **Response `200 OK`:** Returns the created `ProjectItem` with generated `id`.

---

### 12. `PUT /api/projects/{item_id}`
Updates an existing project entry by ID.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:**
  - `item_id` (`string`): ID of the item to update
- **Request Body:** Same schema as `POST /api/projects`
- **Response `200 OK`:** Returns the updated `ProjectItem`
- **Errors:** `404 Not Found` if item does not exist:
  ```json
  { "detail": "Project item not found." }
  ```

---

### 13. `DELETE /api/projects/{item_id}`
Deletes an existing project item by ID.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:**
  - `item_id` (`string`): ID of the item to delete
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "deleted_id": "proj-1"
  }
  ```
- **Errors:** `404 Not Found` if item does not exist.

---

### 14. `PATCH /api/projects/{item_id}/toggle`
Toggles the `hidden` status of a project item.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:** `item_id` (`string`)
- **Request Body:** None / `null`
- **Response `200 OK`:** Returns the updated `ProjectItem`.

---

### 15. `PATCH /api/projects/{item_id}/dev`
Toggles the `under_development` status of a project item.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Path Parameters:** `item_id` (`string`)
- **Request Body:** None / `null`
- **Response `200 OK`:** Returns the updated `ProjectItem`.

---

### 16. `PATCH /api/projects/reorder`
Updates the sort order of all projects based on an array of IDs.

- **Auth Required:** Yes (`X-Admin-Password: <password>`)
- **Request Body:**
  ```json
  {
    "ids": ["proj-2", "proj-1", "proj-3"]
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true
  }
  ```

---

## System / Health Endpoints

### 17. `GET /api/health`
Health check endpoint to verify backend status.

- **Auth Required:** No
- **Response `200 OK`:**
  ```json
  {
    "status": "ok",
    "message": "Portfolio API is running."
  }
  ```

---

## Client Integration Snippets

### Axios Instance Setup

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export default api;
```

#### Calling Public Endpoints:
```javascript
// Get visible portfolio
const fetchPortfolio = async () => {
  const { data } = await api.get('/api/portfolio');
  return data;
};

// Get visible projects
const fetchProjects = async () => {
  const { data } = await api.get('/api/projects');
  return data;
};
```

#### Calling Protected Admin Endpoints:
```javascript
const adminPassword = 'your_admin_password';

// Get all items (activeTab = 'portfolio' | 'projects')
const fetchAll = async (tab) => {
  const { data } = await api.get(`/api/${tab}/all`, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};

// Create item
const createItem = async (tab, itemData) => {
  const { data } = await api.post(`/api/${tab}`, itemData, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};

// Update item
const updateItem = async (tab, id, itemData) => {
  const { data } = await api.put(`/api/${tab}/${id}`, itemData, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};

// Delete item
const deleteItem = async (tab, id) => {
  const { data } = await api.delete(`/api/${tab}/${id}`, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};

// Toggle visibility
const toggleVisibility = async (tab, id) => {
  const { data } = await api.patch(`/api/${tab}/${id}/toggle`, null, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};

// Toggle under development flag
const toggleDev = async (tab, id) => {
  const { data } = await api.patch(`/api/${tab}/${id}/dev`, null, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};

// Reorder items
const reorderItems = async (tab, ids) => {
  const { data } = await api.patch(`/api/${tab}/reorder`, { ids }, {
    headers: { 'X-Admin-Password': adminPassword },
  });
  return data;
};
```

---

### Fetch API Helpers

```javascript
const BASE_URL = 'http://localhost:8000';

// Public GET helper
async function getPublic(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

// Protected Admin helper
async function adminRequest(endpoint, method = 'GET', body = null, password) {
  const headers = {
    'X-Admin-Password': password,
  };
  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed with status ${res.status}`);
  }

  return await res.json();
}
```
