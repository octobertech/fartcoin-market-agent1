import { http } from '@google-cloud/functions-framework';
import { logger } from "firebase-functions";
import { onSchedule } from "firebase-functions/v2/scheduler"
//import '../../init.ts'; // Initialize Firebase first
import {initializeApp} from "firebase-admin/app";
import { scheduledAnalysis } from '../scheduled-analysis.ts';
import { executeTrades } from '../execute-trades.ts';
import { getTokensWithAnalysis, getTradingHistory, getTopAgents } from '../api.ts';

initializeApp();

// HTTP Functions
http('tokens', getTokensWithAnalysis);
http('trades', getTradingHistory);
http('agents', getTopAgents);

// Scheduled Cloud Functions for production
exports.scheduledAnalysis = onSchedule('*/5 * * * *', async (event) => {
  logger.info('Starting scheduled market analysis', {
    executionTime: event.scheduleTime,
    eventId: event.jobName
  });

  try {
    const result = await scheduledAnalysis();
    logger.info('Market analysis completed', {
      executionId: event.jobName,
      result
    });
  } catch (error) {
    logger.error('Market analysis failed', {
      executionId: event.jobName,
      error
    });
    throw error;
  }
});

exports.scheduledTrading = onSchedule('*/5 * * * *' , async (event) => {
    logger.info('Starting scheduled trade execution', {
      executionTime: event.scheduleTime,
      eventId: event.jobName
    });

    try {
      const result = await executeTrades();
      logger.info('Trade execution completed', {
        executionId: event.jobName,
        result
      });
    } catch (error) {
      logger.error('Trade execution failed', {
        executionId: event.jobName,
        error
      });
      throw error;
    }
  });