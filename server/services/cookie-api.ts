import type { AgentMetrics } from "../models/schema.ts";

const COOKIE_API_BASE_URL = 'https://api.cookie.fun';
const COOKIE_API_KEY = process.env.COOKIE_API_KEY;

interface CookieApiResponse<T> {
  success: boolean;
  data: T;
}

async function cookieApiRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${COOKIE_API_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      'X-API-Key': COOKIE_API_KEY || '',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Cookie API request failed: ${response.statusText}`);
  }

  const data: CookieApiResponse<T> = await response.json();
  if (!data.success) {
    throw new Error('Cookie API request was not successful');
  }

  return data.data;
}

export interface TokenMetrics {
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;
}

export const cookieApi = {
  async getTopAgents(): Promise<AgentMetrics[]> {
    return cookieApiRequest<AgentMetrics[]>('/v2/agents/agentsPaged', {
      interval: '_7Days',
      page: '1',
      pageSize: '25'
    });
  },

  
};