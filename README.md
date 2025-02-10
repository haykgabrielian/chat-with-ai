# chat-with-ai Application (Powered by Gemini API)

## 📌 Project Overview
This application is a chatbot similar to ChatGPT, integrated with the **Gemini API** for AI-powered conversations. It is built using **React, Vite, TypeScript**, and **IndexedDB** for local data storage.

## 🚀 Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or later)
- **npm** or **yarn** (package manager)
- A **Google Gemini API key**

### 2️⃣ Installation Steps

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd chat-with-ai
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## 🛠️ Technologies Used & Reasons

| **Technology**      | **Purpose** |
|---------------------|------------|
| **React**           | Component-based UI development for scalability. |
| **Vite**            | Fast build tool, optimized for modern JavaScript frameworks. |
| **TypeScript**      | Provides type safety and better code maintainability. |
| **IndexedDB**       | Client-side database for storing chat history and improving offline functionality. |
| **Styled Compnent** | Styled Compnent for UI development. |


## ⏳ Time Spent on the Task

| **Task**                                      | **Estimated Time** |
|-----------------------------------------------|--------------------|
| **Project setup & configuration**             | 2-3 hours          |
| **UI design & development**                   | 4 hours            |
| **Gemini API integration and testing** | 3 hours            |
| **IndexedDB setup & testing**                 | 1 hours            |
| **Bug fixing & optimizations**                | 2 hours            |
| **Documentation & final touches**             | 1 hour             |

## 📜 Challenges
The biggest challenge was that the Gemini API does not remember the context of previous interactions, requiring me to pass previous messages every time a new message is sent.