### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/relationship-reflection-tool.git
cd relationship-reflection-tool
```

1. Install dependencies

```bash
npm install
# or
yarn install
```

1. Run the development server

```bash
npm run dev
# or
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```text
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
```

## Features in Detail

### Reflection System

- Structured prompts designed by relationship experts
- Progressive questioning that builds deeper insights
- Customizable reflection categories and topics

### AI-Powered Insights

- Intelligent analysis of reflection responses
- Personalized recommendations and growth suggestions
- Pattern recognition in relationship dynamics

### Mobile Optimization

- Responsive design that works seamlessly on all devices
- Horizontal scroll prevention for mobile users
- Touch-optimized interface elements

## Development Notes

### Mobile Responsiveness

Special attention has been paid to mobile optimization:

- Implemented responsive text wrapping for headings
- Added comprehensive overflow-x prevention
- Configured proper viewport handling for mobile devices

### CSS Architecture

- Uses Tailwind CSS with custom utility layers
- Implements CSS custom properties for theming
- Includes both light and dark mode support

## Deployment

This project can be deployed to any hosting platform that supports Next.js:

### Vercel (Recommended)

```bash
# Connect your repository to Vercel
# Deploy automatically on push to main branch
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Contributing

1. Fork the repository
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
1. Commit your changes (`git commit -m 'Add some amazing feature'`)
1. Push to the branch (`git push origin feature/amazing-feature`)
1. Open a Pull Request