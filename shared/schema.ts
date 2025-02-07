
// const z = require("zod");

// // Schema definitions using Zod
// export const topTweetSchema = z.object({
//   tweetUrl: z.string(),
//   tweetAuthorProfileImageUrl: z.string(),
//   tweetAuthorDisplayName: z.string(),
//   smartEngagementPoints: z.number(),
//   impressionsCount: z.number(),
// });

// export const contractInfoSchema = z.object({
//   address: z.string(),
//   chainId: z.number(),
//   name: z.string(),
//   symbol: z.string(),
// });

// export const agentMetricsSchema = z.object({
//   agentName: z.string(),
//   contracts: z.array(contractInfoSchema),
//   twitterUsernames: z.array(z.string()),
//   mindshare: z.number(),
//   mindshareDeltaPercent: z.number(),
//   marketCap: z.number(),
//   marketCapDeltaPercent: z.number(),
//   price: z.number(),
//   priceDeltaPercent: z.number(),
//   liquidity: z.number(),
//   volume24Hours: z.number(),
//   volume24HoursDeltaPercent: z.number(),
//   holdersCount: z.number(),
//   holdersCountDeltaPercent: z.number(),
//   averageImpressionsCount: z.number(),
//   averageImpressionsCountDeltaPercent: z.number(),
//   averageEngagementsCount: z.number(),
//   averageEngagementsCountDeltaPercent: z.number(),
//   followersCount: z.number(),
//   smartFollowersCount: z.number(),
//   topTweets: z.array(topTweetSchema),
// });

// export const tokenSchema = z.object({
//   id: z.number(),
//   symbol: z.string(),
//   name: z.string(),
//   price: z.number(),
//   change24h: z.number(),
//   volume24h: z.number(),
//   timestamp: z.date(),
// });

// export const tradeSchema = z.object({
//   id: z.number(),
//   tokenSymbol: z.string(),
//   type: z.enum(["buy", "sell"]),
//   amount: z.number(),
//   price: z.number(),
//   timestamp: z.date(),
//   executed: z.boolean(),
// });

// export const analysisSchema = z.object({
//   id: z.number(),
//   tokenSymbol: z.string(),
//   sentiment: z.number(),
//   confidence: z.number(),
//   recommendation: z.enum(["buy", "sell", "hold"]),
//   timestamp: z.date(),
// });

// // Types
// export type Token = z.infer<typeof tokenSchema>;
// export type Trade = z.infer<typeof tradeSchema>;
// export type Analysis = z.infer<typeof analysisSchema>;
// export type TopTweet = z.infer<typeof topTweetSchema>;
// export type ContractInfo = z.infer<typeof contractInfoSchema>;
// export type AgentMetrics = z.infer<typeof agentMetricsSchema>;

// // Insert types
// export type InsertToken = Omit<Token, "id" | "timestamp">;
// export type InsertTrade = Omit<Trade, "id" | "timestamp">;
// export type InsertAnalysis = Omit<Analysis, "id" | "timestamp">;
