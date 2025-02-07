
# Fartcoin Market Agent

A serverless Solana AI agent and Fartcoin market analytics platform powered by AI that automatically monitors and makes deep analysis and reliable trades using market and social sentiment data.

## Overview

Fartcoin Market Agent is an automated analysis and trading system that:
- Fetches top agents market and social data every 5 minutes from Cookie API
- Analyzes AI agent market activity and sentiment using latest long-context Google's Gemini Pro 1.5 LLM which is good for the deep understanding of the volatile and varied data 
- Simulates Solana token trades based on AI recommendations with integrated Solana Agent Kit for real swapping (inactive)
- Provides a real-time dashboard for monitoring performance

## Impact

This DeFAI project may have a significant impact on the market and web3 space given it's cutting-edge technical AI science approach to crypto trading and the right focus on the growing and promising AI memecoins space in particular Fartcoin and the relevant Solana blockchain market and ecosystem, also with further development could work across multichains and incorporate and track unlimited defi market and social sentiment data and even simulate and predict the most likely real world outcomes. 

## Architecture

The application uses:
- Frontend: React with TypeScript (not sync)
- Backend: Firebase Cloud Functions
- Database: Firestore
- AI: Google Vertex AI (Gemini Pro 1.5)
- Data Source: Cookie DataSwarm API
- Blockchain: Solana Agent Kit (inactive)

```
├── client/          # React frontend 
├── server/          # Cloud functions
│   ├── functions/   # API endpoints
│   ├── services/    # External services
├── shared/          # Shared types
└── tests/          # Test suites
```

## Key Features

- Real-time market data tracking
- AI-powered trading signals
- Social sentiment analysis
- Virtual trade simulation
- Performance analytics
- Top agents monitoring

## Setup & Development

1. Clone the repository
2. Set required environment variables:
   - COOKIE_API_KEY
   <!-- - GOOGLE_APPLICATION_CREDENTIALS
   - GOOGLE_CLOUD_PROJECT_ID -->
   - FIREBASE_CONFIG
   - SOLANA_PRIVATE_KEY (OPTION)
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

## Scheduled Functions

The system runs two key functions every 5 minutes:

1. Market Analysis: Fetches and analyzes market data
2. Trade Execution: Simulates trades based on analysis

## Testing

Run tests with:
```bash
npm test                # Unit tests
npm run test:e2e       # E2E tests
```

## Deployment

Deploy using Firebase:
1. Create firebase project and get config
2. Setup env variables then do npm run build && npm run deploy


## License

MIT License - See LICENSE file

