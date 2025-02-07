
import { type Request, type Response } from '@google-cloud/functions-framework';
import { db } from '../db.ts';
import type { AgentMetrics, Analysis, Trade, Token } from "../models/schema.ts";

// Get token data with analysis and trades
export const getTokensWithAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const fartcoinMetricsRef = await db.collection('agent_metrics')
      .where('agentName', '==', 'Fartcoin')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    const fartcoinMetrics = fartcoinMetricsRef.docs[0]?.data() as AgentMetrics;

    // Get latest analysis
    const analysisRef = await db.collection('analyses')
      .where('tokenSymbol', '==', 'FARTCOIN')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    const latestAnalysis = analysisRef.docs[0]?.data() as Analysis;

    // Get recent trades
    const tradesRef = await db.collection('trading_actions')
      .where('tokenSymbol', '==', 'FARTCOIN')
      .orderBy('timestamp', 'desc')
      .limit(25)
      .get();

    const trades = tradesRef.docs.map(doc => doc.data() as Trade);

    const token: Token = {
      id: 1,
      symbol: 'FARTCOIN',
      name: 'Fartcoin',
      price: fartcoinMetrics?.price || 0,
      change24h: fartcoinMetrics?.priceDeltaPercent || 0,
      volume24h: fartcoinMetrics?.volume24Hours || 0,
      timestamp: new Date(),
    };

    const enrichedToken = {
      ...token,
      analysis: latestAnalysis,
      trades: trades,
      metrics: fartcoinMetrics
    };

    res.json([enrichedToken]);
  } catch (error) {
    console.error('Failed to fetch token data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get trading history
export const getTradingHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const tradesRef = await db.collection('trading_actions')
      .where('tokenSymbol', '==', 'FARTCOIN')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();

    const trades = tradesRef.docs.map(doc => doc.data() as Trade);
    res.json(trades);
  } catch (error) {
    console.error('Failed to fetch trading history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get top agents data
export const getTopAgents = async (req: Request, res: Response): Promise<void> => {
  try {
    const agentMetricsRef = await db.collection('agent_metrics')
      .orderBy('marketCap', 'desc')
      .limit(25)
      .get();

    const agentMetrics = agentMetricsRef.docs.map(doc => doc.data() as AgentMetrics);
    res.json(agentMetrics);
  } catch (error) {
    console.error('Failed to fetch top agents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
