# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



---

# 📄 `frontend/README.md`

```md
# Notes App – Frontend

Frontend application for the Notes App built with **React** and **Vite**.

This frontend consumes the Notes API and demonstrates component-based architecture and clean separation of concerns.

---

## ✨ Features

- Display list of notes
- Create, update, and delete notes
- API integration with backend service
- Reusable UI components
- Environment-based configuration

---

## 🧱 Tech Stack

- React.js
- Vite
- Fetch / Axios
- Tailwind CSS *(optional)*

---

## 🏗️ Architecture Overview



React Components
↓
API Service Layer
↓
Notes API (Backend)


---

## 📂 Project Structure



frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/ # API calls
│ ├── hooks/
│ └── main.jsx
├── package.json
└── README.md


---

## 🔌 API Integration

All API calls are centralized in the service layer:



src/services/note.service.js


Example:
```js
fetch(`${import.meta.env.VITE_API_URL}/notes`)

⚙️ Environment Variables

Create a .env file:

VITE_API_URL=http://localhost:4000/api

🚀 Running the Frontend
npm install
npm run dev

🧪 Testing

Manual testing via browser

API behavior verified via backend Swagger & Postman