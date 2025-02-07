import type { Token, Trade, Analysis } from "@shared/schema";

export const mockTokens: Token[] = [
  {
    id: 1,
    symbol: "FART",
    name: "FartCoin",
    price: 0.00001234,
    change24h: 5.23,
    volume24h: 1245789.34,
    timestamp: new Date("2024-03-20T10:00:00Z")
  }
];

export const mockTrades: Trade[] = [
  {
    id: 1,
    tokenSymbol: "FART",
    type: "buy",
    amount: 1000000,
    price: 0.00001234,
    timestamp: new Date("2024-03-20T10:00:00Z"),
    executed: true
  }
];

export const mockAnalyses: Analysis[] = [
  {
    id: 1,
    tokenSymbol: "FART",
    sentiment: 0.75,
    confidence: 0.85,
    recommendation: "buy",
    timestamp: new Date("2024-03-20T10:00:00Z")
  }
];