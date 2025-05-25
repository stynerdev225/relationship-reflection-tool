Relationship Reflection Tool
Relationship Reflection Tool

Project Overview
This repository contains a comprehensive relationship reflection tool designed to help individuals and couples gain deeper insights into their relationships. The application provides structured prompts, guided reflections, and personalized insights to foster better communication and understanding in relationships.

Features
Interactive Reflection Prompts: Thoughtfully crafted questions to guide relationship introspection
Personalized Insights: AI-powered analysis and recommendations based on user responses
Progress Tracking: Monitor relationship growth and reflection journey over time
Mobile-Responsive Design: Fully optimized for all devices with horizontal scroll prevention
Beautiful UI: Modern, elegant interface designed for comfort and ease of use
Privacy-Focused: Secure handling of personal reflection data
Technology Stack
Framework: Next.js 15.2.4
UI Library: React 19
Styling: Tailwind CSS with custom CSS layers
Icons: Lucide React
Typography: Custom font styling with elegant typography
UI Components: Custom-built components with Radix UI primitives
Development: TypeScript for type safety
Getting Started
Prerequisites
Node.js (v18 or newer)
npm or yarn
Installation
Clone the repository
git clone https://github.com/yourusername/relationship-reflection-tool.git
cd relationship-reflection-tool
Install dependencies
npm install
# or
yarn install
Run the development server
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser
Project Structure
relationship-reflection-tool/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind configuration
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── api-status-notification.tsx
│   ├── insight-card.tsx
│   ├── reflection-prompter.tsx
│   └── reflection-summary.tsx
├── lib/                  # Utility functions and services
│   ├── openrouter-api.ts # API integration
│   ├── reflectionUtils.ts # Reflection logic utilities
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional styling
Features in Detail
Reflection System
Structured prompts designed by relationship experts
Progressive questioning that builds deeper insights
Customizable reflection categories and topics
AI-Powered Insights
Intelligent analysis of reflection responses
Personalized recommendations and growth suggestions
Pattern recognition in relationship dynamics
Mobile Optimization
Responsive design that works seamlessly on all devices
Horizontal scroll prevention for mobile users
Touch-optimized interface elements
Development Notes
Mobile Responsiveness
Special attention has been paid to mobile optimization:

Implemented responsive text wrapping for headings
Added comprehensive overflow-x prevention
Configured proper viewport handling for mobile devices
CSS Architecture
Uses Tailwind CSS with custom utility layers
Implements CSS custom properties for theming
Includes both light and dark mode support
Deployment
This project can be deployed to any hosting platform that supports Next.js:

Vercel (Recommended)
# Connect your repository to Vercel
# Deploy automatically on push to main branch
Manual Deployment
# Build for production
npm run build

# Start production server
npm start
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
Developer Information
// Developed with ❤️ for better relationships
// Professional Web Development
// Date: May 24, 2025
// Framework: Next.js + React + Tailwind CSS

// Disclaimer: This application is designed to support relationship reflection
// and should not replace professional counseling or therapy when needed.
// Users are encouraged to seek professional help for serious relationship issues.
License
© 2025 Relationship Reflection Tool. All rights reserved.

This project is licensed under the MIT License - see the LICENSE file for details.

Support
For questions, issues, or feature requests, please:

Open an issue in this repository
Contact the development team
Check the documentation for common solutions
This project was created with care to help people build stronger, more understanding relationships. We believe that reflection and communication are the foundations of healthy relationships.