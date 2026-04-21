# 📝 Blog Platform (Frontend/Backend)

A full-stack social blogging platform inspired by Reddit, where users can share articles, interact through comments, and build their profile.

---

## 📜 About the Project

Built to demonstrate professional-level full-stack development, implementing NestJS for the backend and Angular for the frontend with a focus on clean architecture and real-world features.

---

## ✨ Key Features

- **User Authentication:** Registration and login with JWT to protect routes and actions
- **Profile Management:** Users can edit their profile including name, bio and photo
- **Article CRUD:** Complete system to Create, Read, Update and Delete articles
- **Rich Text Editor:** Article editor with formatting options (bold, italic, etc.)
- **Social Interaction:** Like/Dislike system and comments section on each article
- **Authorization:** Users can only edit or delete their own content
- **Responsive Design:** Dark theme UI adaptable to different screen sizes

---

## 🛠️ Tech Stack

#### Frontend
- Angular · TypeScript · RxJS · Angular Material · ngx-editor

#### Backend
- NestJS · TypeScript · MongoDB · Mongoose · Passport.js · Class-validator

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- NPM
- Angular CLI: `npm install -g @angular/cli`
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HasanAshee/blog-frontend.git
```
2. Navigate to the project folder:
```bash
cd REPO_NAME
```
3. Install dependencies:
```bash
npm install
```
4. **(Backend only)** Create a `.env` file in the root:
DATABASE_URL=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_LONG_SECRET_KEY

5. Start the development server:
   - **Frontend:** `ng serve`
   - **Backend:** `npm run start:dev`

---

## 📝 License
Distributed under the MIT License.

