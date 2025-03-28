# Microservices Architecture Project

This repository contains a simple microservices-based application built with **Node.js**, **Express**, and **React**. The architecture is designed with independent services that communicate via a simple manual event bus, ensuring seamless data flow between them.

## Features
- **Create Post**: Users can create new posts.
- **Retrieve Posts**: Fetches all existing posts.
- **Create Comment**: Adds a comment to a specific post.
- **Retrieve Comments**: Retrieves comments associated with a post.
- **Moderation Service**: Automatically moderates comments based on predefined rules.
- **Event Bus**: Facilitates communication between microservices using a manual event-driven approach.
- **Query Service**: Maintains an in-memory data store that aggregates data from all past events.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Communication**: Custom manual event bus

## Architecture Overview
This project follows a microservices architecture, where each service is independent and communicates asynchronously through an event-driven model.

### Services
1. **Posts Service**: Handles post creation and retrieval.
2. **Comments Service**: Manages comments related to posts.
3. **Moderation Service**: Reviews comments and assigns a status:
   - `pending`: Initially assigned to all new comments.
   - `approved`: Assigned if the comment passes moderation.
   - `rejected`: Assigned if the comment contains restricted words (e.g., "redacted").
4. **Query Service**: Maintains an in-memory data store and fetches all past events from the event bus for fast data retrieval.
5. **Event Bus**: Ensures inter-service communication by propagating events between services.
6. **Client (Frontend)**: React-based user interface for interacting with the services.

## Setup & Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS version)
- **npm** or **yarn**

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies for each service:
   ```sh
   npm install
   ```
3. Start each service:
   ```sh
   npm start
   ```
4. Start the event bus:
   ```sh
   node event-bus.js
   ```
5. Start the moderation service:
   ```sh
   node moderation.js
   ```
6. Start the query service:
   ```sh
   node query.js
   ```
7. Start the frontend application:
   ```sh
   cd client
   npm start
   ```
8. Open the browser and navigate to `http://localhost:3000`.

## Moderation Rules
The moderation service scans comments for restricted words. If a comment contains the word "redacted," it is automatically rejected. Otherwise, it is approved.

## Query Service Functionality
- Maintains an in-memory data store of posts and comments.
- Fetches all past events from the event bus on startup to reconstruct the application state.
- Provides fast retrieval of aggregated data for the frontend.

## Event Flow
1. A user submits a comment.
2. The event bus broadcasts a `CommentCreated` event.
3. The moderation service processes the comment and emits a `CommentModerated` event with an updated status.
4. The comments service updates the status accordingly and emits a `CommentUpdated` event.
5. The query service listens to all events and updates its in-memory store.
6. The frontend fetches data from the query service for efficient rendering.

This event-driven approach ensures scalability and loose coupling between services.
