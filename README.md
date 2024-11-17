# AI Data Integration Assistant with Web3 Authentication

A modern web application that combines AI-powered data management with secure Web3 authentication through Alchemy Account Kit. The application helps users manage their digital life through secure OAuth integrations with various services while providing a seamless blockchain-based authentication experience.

## Features

### 1. Web3 Authentication

- Secure login with Alchemy Account Kit
- Multiple authentication methods:
  - Email authentication
  - Passkey support
  - Google social login
  - External wallet connections (WalletConnect)
- Persistent authentication state
- Server-side rendering support

### 2. Intelligent AI Agents

- **Email Summary Assistant**

  - Analyzes unread emails and generates daily summaries
  - Categorizes emails by importance and required actions
  - Provides actionable insights from your inbox

- **Schedule Assistant**
  - Manages calendar events and meetings
  - Automatically arranges transportation for meetings
  - Integrates with ride-sharing services

### 3. Service Integrations

- OAuth 2.0 authentication for all service connections
- Supported services:
  - Gmail
  - Google Calendar
  - Uber
- End-to-end encryption for sensitive data
- GDPR-compliant data handling

## Technology Stack

### Frontend

- Next.js 15.0.3 (App Router)
- React 19.0.0-rc
- TypeScript
- Tailwind CSS
- Lucide Icons

### Blockchain & Authentication

- Alchemy Account Kit
- WalletConnect
- Viem
- Wagmi
- OpenZeppelin Contracts

### Backend

- Next.js API Routes
- OpenAI GPT-4
- Google APIs (Gmail, Calendar)
- OAuth 2.0 Integration

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-data-assistant.git
cd ai-data-assistant
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in the following variables in `.env.local`:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
ENCRYPTION_KEY=your_32_byte_encryption_key
OPENAI_API_KEY=your_openai_api_key
UBER_API_KEY=your_uber_api_key
LYFT_API_KEY=your_lyft_api_key

# Alchemy Account Kit
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
ALCHEMY_GAS_POLICY_ID=your_gas_policy_id

# Contract
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address

# Dynamic Environment ID
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# Encryption Key (32 bytes)
ENCRYPTION_KEY=your_32_byte_encryption_key_here

# Ride Service APIs
UBER_API_KEY=your_uber_api_key_here
LYFT_API_KEY=your_lyft_api_key_here
```

You can obtain these keys from:

1. OpenAI API Key: https://platform.openai.com/account/api-keys
2. Google OAuth Credentials: https://console.cloud.google.com/apis/credentials
3. Uber API Key: https://developer.uber.com/
4. Lyft API Key: https://developer.lyft.com/

Make sure to:

1. Never commit `.env.local` to version control
2. Add `.env.local` to your `.gitignore` file
3. Keep your API keys secure

Would you like me to provide instructions for obtaining any of these API keys?

https://sepolia.basescan.org/address/0xb0Be9A7C457eCcd7b4E3f62166D6BA9392977fAA
