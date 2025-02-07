
import { db } from '../db.ts';
import { cookieApi } from '../services/cookie-api.ts';
import { analyzeMarket } from '../ai.ts';
import type { AgentMetrics, Analysis, Trade } from "../models/schema.ts";

async function collectAndStoreAgentData() {
  // Fetch top 25 agents data
  const topAgents = await cookieApi.getTopAgents();
  
  // Store agent metrics in Firebase
  const batch = db.batch();
  topAgents.forEach((agent) => {
    const metricsRef = db.collection('agent_metrics').doc();
    batch.set(metricsRef, {
      agentName: agent.agentName,
      contracts: agent.contracts || [],
      twitterUsernames: agent.twitterUsernames || [],
      mindshare: agent.mindshare || 0,
      mindshareDeltaPercent: agent.mindshareDeltaPercent || 0,
      marketCap: agent.marketCap || 0,
      marketCapDeltaPercent: agent.marketCapDeltaPercent || 0,
      price: agent.price || 0,
      priceDeltaPercent: agent.priceDeltaPercent || 0,
      liquidity: agent.liquidity || 0,
      volume24Hours: agent.volume24Hours || 0,
      volume24HoursDeltaPercent: agent.volume24HoursDeltaPercent || 0,
      holdersCount: agent.holdersCount || 0,
      holdersCountDeltaPercent: agent.holdersCountDeltaPercent || 0,
      averageImpressionsCount: agent.averageImpressionsCount || 0,
      averageImpressionsCountDeltaPercent: agent.averageImpressionsCountDeltaPercent || 0,
      averageEngagementsCount: agent.averageEngagementsCount || 0,
      averageEngagementsCountDeltaPercent: agent.averageEngagementsCountDeltaPercent || 0,
      followersCount: agent.followersCount || 0,
      smartFollowersCount: agent.smartFollowersCount || 0,
      topTweets: (agent.topTweets || []).map(tweet => ({
        tweetUrl: tweet.tweetUrl,
        tweetAuthorProfileImageUrl: tweet.tweetAuthorProfileImageUrl,
        tweetAuthorDisplayName: tweet.tweetAuthorDisplayName,
        smartEngagementPoints: tweet.smartEngagementPoints,
        impressionsCount: tweet.impressionsCount
      })),
      timestamp: new Date()
    });
  });
  await batch.commit();
  
  return topAgents;
}

async function getAnalysisData(tokenSymbol: string) {
  
  // Get recent agent metrics
  const recentAgentMetricsRef = await db.collection('agent_metrics')
    .orderBy('timestamp', 'desc')
    .limit(100)
    .get();
    
  const agentMetrics = recentAgentMetricsRef.docs.map(doc => doc.data() as AgentMetrics);

  const fartcoinData = agentMetrics.find(agent => agent.agentName === 'Fartcoin');

  // Get historical analysis
  const historicalAnalysisRef = await db.collection('analyses')
    .where('tokenSymbol', '==', tokenSymbol)
    .orderBy('timestamp', 'desc')
    .limit(100)
    .get();

  const historicalAnalysis = historicalAnalysisRef.docs.map(doc => doc.data() as Analysis);

  const allActionsRef = await db.collection('trading_actions')
    .where('executed', '==', true)
    .limit(100)
    .get();

  const allActions = allActionsRef.docs.map(doc => doc.data() as Trade);

  return {
    agentMetrics,
    historicalAnalysis,
    allActions,
    price: fartcoinData?.price || 0
  };
}

export const scheduledAnalysis = async () => {
  try {
    // Collect and store agent data
    await collectAndStoreAgentData();
    
    // Get data for analysis
    const analysisData = await getAnalysisData('FARTCOIN');
    
    // Perform AI analysis
    const analysis = await analyzeMarket(
      'FARTCOIN',
      {
        topAgents: analysisData.agentMetrics,
        historicalAnalysis: analysisData.historicalAnalysis,
        allActions: analysisData.allActions
      }
    );

    // Store analysis results
    const analysisRef = await db.collection('analyses').add({
      ...analysis,
      tokenSymbol: 'FARTCOIN',
      timestamp: new Date()
    });

    // Create pending trading action if confidence is high enough
    if (analysis.confidence > 0.8 && analysis.price !== 0) {
      await db.collection('trading_actions').add({
        tokenSymbol: 'FARTCOIN',
        recommendation: analysis.recommendation,
        confidence: analysis.confidence,
        suggestedAmount: analysis.amount,
        currentPrice: analysisData.price,
        executed: false,
        timestamp: new Date(),
        analysisRef: analysisRef.id
      });
    }

    //res.status(200).send('Scheduled analysis completed successfully');
  } catch (err) {
    console.error('Scheduled analysis failed:', err);
    //const errorMessage = isError(err) ? err.message : 'An unknown error occurred';
    //res.status(500).send(`Scheduled analysis failed: ${errorMessage}`);
  }
};
