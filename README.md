# Habits Tamer

A modern, feature-rich web application for tracking and managing your habits effectively. Build consistent routines and monitor your progress over time.

## 🌟 Features

- **Habit Tracking**: Create, track, and manage habits with customizable frequencies (daily, weekly, monthly, yearly)
- **Progressive Web App (PWA)**: Install on your devices for offline access
- **Authentication**: Secure authentication with NextAuth.js
- **Categorization**: Organize habits by categories (Lifestyle, Health, Personal Growth, etc.)
- **Habit Insights**: Visual progress tracking and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📱 Screenshots

*Coming soon*

## 🚀 Getting Started

### Prerequisites

- Node.js (recommended version in `.nvmrc`)
- PNPM package manager
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/habits_tamer"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:4000"
# Add other required environment variables for auth providers
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/habits-tamer.git
cd habits-tamer
```

2. Install dependencies
```bash
pnpm install
```

3. Set up the database
```bash
pnpm prisma:generate
pnpm prisma:deploy
```

4. Start the development server
```bash
pnpm dev
```

5. Open [http://localhost:4000](http://localhost:4000) with your browser to see the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18, Tailwind CSS, DaisyUI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Form Validation**: Zod
- **Icons**: Tabler Icons
- **Styling**: Tailwind CSS, SASS
- **Development**: TypeScript, ESLint, Prettier

## 📊 Project Structure

- `/app`: Next.js App Router API routes
- `/auth`: Authentication configuration
- `/components`: Reusable UI components
- `/features`: Main application features organized by domain
- `/hooks`: Custom React hooks
- `/pages`: Next.js page components and routing
- `/prisma`: Database schema and configuration
- `/providers`: React Context providers
- `/public`: Static assets
- `/styles`: Global styles
- `/utils`: Utility functions

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🧑‍💻 Author

Cosimo Chellini - [cosimo.chellini@gmail.com](mailto:cosimo.chellini@gmail.com)

## 🙏 Acknowledgements

- Next.js team for the awesome framework
- All open-source libraries used in this project
