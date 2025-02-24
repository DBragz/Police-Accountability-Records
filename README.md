# Police Accountability Records Platform

A comprehensive web platform for aggregating and transparently displaying publicly available police accountability data. This platform provides advanced search capabilities and filtering mechanisms to help citizens access and understand police accountability records.

## Features

- Search through verified police accountability records
- Filter by location, date, and department
- View detailed incident reports with sources
- Add new incident records with proper citations
- Decentralized storage using IPFS
- Responsive design for all devices

## Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **shadcn/ui** for beautiful, accessible UI components
- **TanStack Query** (React Query v5) for server state management
- **React Router** for dynamic routing and navigation
- **React Hook Form** with Zod for form validation
- **Tailwind CSS** for utility-first styling
- **Lucide React** for beautiful icons
- **Framer Motion** for smooth animations

### Backend
- **Express.js** with TypeScript for API development
- **IPFS** via Pinata for decentralized data storage
- **IndexedDB** for offline persistence

## Prerequisites

Before you begin, ensure you have:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A modern web browser
- [Pinata](https://www.pinata.cloud/) account for IPFS storage

## Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   ```

## Development

Start the development server:
```bash
npm run dev
```

This will:
- Start the Express backend server
- Launch the Vite development server
- Enable hot module replacement (HMR)
- Watch for TypeScript errors

The application will be available at `http://localhost:5000`.

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
├── server/                # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # IPFS storage interface
│   └── ipfs.ts          # IPFS integration
└── shared/               # Shared TypeScript types
    └── schema.ts        # Zod schemas and types
```

### Adding New Features

1. Define types in `shared/schema.ts`
2. Implement API endpoints in `server/routes.ts`
3. Add UI components in `client/src/components`
4. Create new pages in `client/src/pages`
5. Update routing in `client/src/App.tsx`

## Deployment

This application is designed to be deployed on Replit:

1. Fork the repository on Replit
2. Set up environment variables in Replit Secrets
3. Deploy using Replit's deployment features

For other platforms:
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` directory to your hosting platform
3. Ensure environment variables are properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Code Style

- Follow TypeScript best practices
- Use functional components
- Implement proper error handling
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## Support

For issues and feature requests, please create an issue in the repository.

## Authors

- [Daniel Ribeirinha-Braga](https://github.com/DBragz)
- [Editor](https://github.com/replit) - AI Code Assistant

## License

This project is licensed under the MIT License - see the LICENSE file for details.