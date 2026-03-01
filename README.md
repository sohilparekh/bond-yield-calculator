# Bond Yield Calculator

A comprehensive bond yield calculation application with backend API and frontend interface built with NestJS and Next.js.

## 🏗️ Architecture

### Backend (NestJS API)

- **Framework**: NestJS with TypeScript
- **Port**: 3000
- **Features**:
  - Bond yield calculations (current yield, yield to maturity)
  - Cash flow schedule generation
  - Input validation and error handling
  - CORS enabled for frontend integration

### Frontend (Next.js)

- **Framework**: Next.js 16 with TypeScript
- **Port**: 3001
- **Features**:
  - Interactive bond calculator form
  - Real-time calculation results
  - Dark mode support
  - Responsive design with Tailwind CSS

### Shared Components

- **UI Package**: Custom React component library with shadcn/ui compatibility
- **Styling**: Tailwind CSS v4 with custom prefix system
- **Theme**: Dark mode support with CSS variables

## 📁 Folder Structure

```
bond-yield-calculator/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── bond/           # Bond calculation logic
│   │   │   │   ├── bond.controller.ts
│   │   │   │   ├── bond.service.ts
│   │   │   │   ├── bond.module.ts
│   │   │   │   ├── bond.controller.spec.ts
│   │   │   │   └── bond.service.spec.ts
│   │   │   ├── app.module.ts    # Main application module
│   │   │   ├── app.controller.ts # Root controller
│   │   │   ├── app.service.ts    # Root service
│   │   │   └── main.ts         # Application bootstrap
│   │   ├── test/
│   │   │   ├── app.e2e-spec.ts     # E2E tests
│   │   │   ├── jest-e2e.json       # Jest configuration
│   │   │   └── setup.ts            # Test setup
│   │   └── package.json
│   └── web/                    # Next.js Frontend
│       ├── app/
│       │   ├── layout.tsx          # Root layout
│       │   ├── page.tsx            # Main page
│       │   ├── theme-toggle.tsx     # Dark mode toggle
│       │   └── react-scan-provider.tsx # Performance monitoring
│       ├── e2e/
│       │   └── bond-calculation.spec.ts # E2E tests
│       ├── playwright.config.ts      # Playwright configuration
│       └── package.json
└── packages/
    ├── @repo/api/               # Shared API types
    ├── @repo/eslint-config/       # ESLint configurations
    ├── @repo/jest-config/         # Jest configurations
    ├── @repo/tailwind-config/     # Tailwind CSS configuration
    ├── @repo/typescript-config/   # TypeScript configurations
    └── @repo/ui/                # Shared UI components
        ├── src/
        │   ├── components/        # Reusable components
        │   │   ├── button.tsx
        │   │   ├── input.tsx
        │   │   ├── label.tsx
        │   │   └── card.tsx
        │   ├── molecules/         # Complex components
        │   │   ├── bond-calculator-form.tsx
        │   │   ├── bond-results.tsx
        │   │   └── cash-flow-table.tsx
        │   └── lib/
        │       └── utils.ts         # Utility functions
        └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bond-yield-calculator

# Install dependencies
pnpm install
```

## 🏃‍♂️ Running the Application

### Backend (API Server)

```bash
# Navigate to API directory
cd apps/api

# Start development server
pnpm run dev

# API will be available at http://localhost:3000
```

### Frontend (Web Application)

```bash
# Navigate to web directory
cd apps/web

# Start development server
pnpm run dev

# Frontend will be available at http://localhost:3001
```

### Both Applications Simultaneously

```bash
# From root directory, start both backend and frontend
pnpm run dev

# This will start:
# - Backend API at http://localhost:3000
# - Frontend at http://localhost:3001
```

## 🧪 Testing

### Backend Tests

```bash
# Run unit and integration tests
cd apps/api
pnpm run test

# Run e2e tests
pnpm run test:e2e

# Run tests with coverage
pnpm run test --coverage
```

### Frontend Tests

```bash
# Run e2e tests
cd apps/web
pnpm run test:e2e

# Run tests in headed mode (shows browser)
pnpm run test:e2e --headed
```

## 🔧 Development Commands

### Building

```bash
# Build all applications and packages
pnpm run build

# Build only backend
pnpm run build --filter=api

# Build only frontend
pnpm run build --filter=web
```

### Linting

```bash
# Lint all projects
pnpm run lint

# Lint specific project
pnpm run lint --filter=api
pnpm run lint --filter=web
```

### Type Checking

```bash
# Type check all projects
pnpm run typecheck

# Type check specific project
pnpm run typecheck --filter=api
pnpm run typecheck --filter=web
```

## 🌐 API Endpoints

### Bond Calculation

#### POST /bond/calculate

Calculate bond yields and cash flow schedule.

**Request Body:**

```json
{
  "faceValue": 1000,
  "annualCouponRate": 5,
  "marketPrice": 950,
  "yearsToMaturity": 10,
  "couponFrequency": "annual" | "semi-annual"
}
```

**Response (200 OK):**

```json
{
  "currentYield": 5.263,
  "yieldToMaturity": 5.669,
  "totalInterestEarned": 500.00,
  "premiumOrDiscount": "discount",
  "cashFlowSchedule": [...]
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Face value must be positive",
  "error": "Bad Request",
  "statusCode": 400
}
```

## 🎨 Features

### Bond Calculator

- **Current Yield Calculation**: Annual coupon payment ÷ Current market price
- **Yield to Maturity**: Complex calculation using Newton-Raphson method
- **Cash Flow Schedule**: Payment schedule with cumulative interest
- **Price Status**: Indicates if bond is at premium, discount, or par

### User Interface

- **Real-time Calculations**: Instant results as you type
- **Input Validation**: Comprehensive error handling
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices
- **Performance Monitoring**: React Scan integration for optimization

## 🔒 CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:3001` (development)
- `https://bond-yield-calculator-web.vercel.app/` (production)

## 📦 Technology Stack

### Backend

- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe JavaScript
- **Jest**: Testing framework
- **ESLint**: Code linting
- **Supertest**: HTTP testing

### Frontend

- **Next.js**: React framework with SSR support
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Playwright**: E2E testing
- **React Scan**: Performance monitoring

### DevOps

- **Turborepo**: Monorepo build system
- **pnpm**: Fast package manager
- **ESLint + Prettier**: Code quality tools
- **Husky**: Git hooks for pre-commit checks

## 🚀 Deployment

### Backend Deployment

1. Build the application: `pnpm run build --filter=api`
2. Deploy to your preferred hosting platform
3. Ensure environment variables are configured

### Frontend Deployment

1. Build the application: `pnpm run build --filter=web`
2. Deploy to Vercel, Netlify, or similar platform
3. Update CORS configuration in backend if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm run test`
5. Run linting: `pnpm run lint`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
