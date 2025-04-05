# Campus Portal

A comprehensive campus portal for students, faculty, and administrators, featuring announcements, events, projects, complaints, and more.

## Features

- *UI Demo Mode* - Functioning UI with mock data (no database connectivity)
- *Role-based Dashboards* - Different interfaces for students, faculty, and admins
- *Projects* - Browse campus projects with filtering options
- *Complaints* - View and submit complaints
- *Announcements and Events* - Stay updated with campus activities
- *Dark/Light Theme* - Toggle between dark and light themes

## Tech Stack

- *Next.js* - React framework with App Router
- *Tailwind CSS* - Utility-first CSS framework
- *shadcn/ui* - Reusable UI components
- *next-themes* - Dark/light theme support

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Setup

1. Clone the repository:
   bash
   git clone https://github.com/gitesh-ujgaonkar/campus-connect.git
   cd campus-connect
   

2. Install dependencies:
   bash
   npm install
   

3. Run the development server:
   bash
   npm run dev
   

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Login Instructions

No actual authentication is implemented. For demo purposes:

- Use any email containing "admin" (e.g., admin@example.com) to be directed to the admin dashboard
- Use any email containing "faculty" (e.g., faculty@example.com) to be directed to the faculty dashboard
- Use any other email to be directed to the student dashboard

## Deployment

This project can be easily deployed on Vercel without additional configuration.

## Future Enhancements

- Database integration with Neon PostgreSQL (planned)
- Authentication with NextAuth.js
- Real data persistence
- API integration
