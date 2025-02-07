
import { describe, it, expect, vi } from 'vitest';
import { cookieApi } from '../../server/services/cookie-api';

describe('Cookie API', () => {
  it('should fetch top agents', async () => {
    const agents = await cookieApi.getTopAgents();
    expect(Array.isArray(agents)).toBe(true);
    expect(agents[0]).toHaveProperty('agentName');
  });
});
