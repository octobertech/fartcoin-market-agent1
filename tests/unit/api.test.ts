
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTokensWithAnalysis, getTradingHistory, getTopAgents } from '../../server/functions/api';
import { db } from '../../server/db';

vi.mock('../../server/db', () => ({
  db: {
    collection: vi.fn(() => ({
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      get: vi.fn().mockResolvedValue({
        docs: [{
          data: () => ({
            agentName: 'Fartcoin',
            price: 100,
            volume24Hours: 1000000
          })
        }]
      })
    }))
  }
}));

describe('API Endpoints', () => {
  const mockRes = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch token data with analysis', async () => {
    await getTokensWithAnalysis({} as any, mockRes as any);
    expect(mockRes.json).toHaveBeenCalled();
  });

  it('should fetch trading history', async () => {
    await getTradingHistory({} as any, mockRes as any);
    expect(mockRes.json).toHaveBeenCalled();
  });

  it('should fetch top agents', async () => {
    await getTopAgents({} as any, mockRes as any);
    expect(mockRes.json).toHaveBeenCalled();
  });
});
