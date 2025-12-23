# CreatiVerse — Frontend 🎨

**CreatiVerse** is the frontend for a contest & creator-driven platform built with React and Vite. This repository provides the client-side application used by creators and participants to browse contests, submit entries, view leaderboards, and manage profiles.

---

## 🔗 Live & API Links

- **Frontend (Live)**: https://creati-verse-frontend.vercel.app/
- **Backend (Live)**: https://creati-verse-backend.vercel.app/
- **API Documentation**: https://documenter.getpostman.com/view/26622927/2sB3dWsnYx

---

## 🚀 Features

- Browse and filter contests with search and categories
- Create / Update contests (Creator flow)
- Submit entries and view contest details
- User authentication and profile management
- Payments and participation confirmation flows
- Responsive UI with theme toggle

---

## 🧰 Tech Stack

- **Frontend**: React, Vite, React Router
- **Styling**: CSS, Tailwind (if applicable)
- **HTTP Client**: axios (see `src/api/axiosSecure.jsx`)
- **State & Context**: React Context (Auth, Theme)

---

## 💻 Local Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Install

```bash
git clone https://github.com/ShoFiq6030/CreatiVerse-Frontend.git
cd assignment-11-frontend
npm install
# or
# yarn install
```

### Environment

Create a `.env.local` file in the project root and add the required environment variables. Example:

```text
VITE_API_BASE_URL=https://creati-verse-backend.vercel.app
# Add other keys (e.g., VITE_FIREBASE_* , CLOUDINARY_*) as needed
```

> Make sure `VITE_API_BASE_URL` points to the backend you want to use (local or live).

### Run (Development)

```bash
npm run dev
# or
# yarn dev
```

Open http://localhost:5173 (or the port shown in terminal) to view the app.

### Build

```bash
npm run build
# or
# yarn build
```

---

## 📁 Project Structure (Highlights)

- `src/` — application source
  - `components/` — reusable UI components
  - `pages/` — route pages (Home, AllContest, ContestDetails, Profile, etc.)
  - `api/axiosSecure.jsx` — axios instance for API calls
  - `context/` — auth & theme contexts
  - `layouts/` — main layout components
  - `router/Router.jsx` — app routes

---

## 🧪 Tests

(No automated tests included in the current scaffold.)

---

## 🤝 Contributing

Contributions are welcome! Please open issues for bugs or feature requests and submit PRs with clear descriptions of changes.

---

## 📝 Notes

- Refer to the **API Documentation** (link above) for available endpoints, request/response formats, and authentication details.
- If you run into CORS or auth-related issues running against the live backend, check that your `VITE_API_BASE_URL` and auth tokens are configured correctly.

---

## 📬 Contact

For questions about the frontend, open an issue on this repo or contact the maintainer in your project team.

---

**Enjoy building CreatiVerse!** ✅
