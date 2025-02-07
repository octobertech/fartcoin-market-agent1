import { db } from '../db.ts';
import type { Trade } from "../models/schema.ts";
// import { SolanaAgent } from 'solana-agent-kit';
// const agent = new SolanaAgent({ privateKey: process.env.SOLANA_PRIVATE_KEY });
// import { PublicKey } from "@solana/web3.js";
// const USDC = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
// const FARTCOIN = new PublicKey("9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump");


export const executeTrades = async () => {
  try {
    // Get pending trading actions
    const pendingActionsRef = await db.collection('trading_actions')
      .where('executed', '==', false)
      .get();

    const batch = db.batch();

    for (const doc of pendingActionsRef.docs) {
      const action = doc.data();

      // Execute trade based on analysis
      if (action.confidence > 0.8) {
        const trade: Trade = {
          id: Math.floor(Math.random() * 1000000), // Temporary ID generation
          tokenSymbol: action.tokenSymbol,
          type: action.recommendation,
          amount: action.suggestedAmount || 0,
          price: action.currentPrice || 0,
          timestamp: new Date(),
          executed: true
        };
        
        // if (action.recommendation === 'buy') {
        //   await agent.trade(
        //     FARTCOIN,
        //     action.suggestedAmount,  
        //     USDC,
        //     100   // 1% slippage
        //   );
        // } else if (action.recommendation === 'sell') {
        //   await agent.trade(
        //     USDC,
        //     action.suggestedAmount, 
        //     FARTCOIN,
        //     100   // 1% slippage
        //   );
        // }

        // Record trade in Firebase
        const tradeRef = db.collection('trades').doc();
        batch.set(tradeRef, trade);

        // Mark action as executed
        batch.update(doc.ref, { 
          executed: true, 
          executedAt: new Date(),
          tradeRef: tradeRef.id
        });
      }
    }

    // Commit all changes atomically
    await batch.commit();
    //res.status(200).send('Trade execution completed successfully');
  } catch (err: unknown) {
    console.error('Trade execution failed:', err);
    //const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    //res.status(500).send(`Trade execution failed: ${errorMessage}`);
  }
};