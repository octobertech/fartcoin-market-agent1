import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Token } from "@shared/schema";

export function MarketOverview() {
  const { data: tokens } = useQuery({
    queryKey: ["/api/tokens"],
  });

  const fartToken = tokens?.[0];

  if (!fartToken) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Price</p>
            <h3 className="text-2xl font-bold">${fartToken.price.toFixed(8)}</h3>
            <p className={`text-xs ${fartToken.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {fartToken.change24h >= 0 ? '+' : ''}{fartToken.change24h.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">24h Volume</p>
            <h3 className="text-2xl font-bold">${fartToken.volume24h.toLocaleString()}</h3>
          </div>
          <div>
            <p className="text-sm font-medium">Market Cap</p>
            <h3 className="text-2xl font-bold">${(fartToken.metrics?.marketCap || 0).toLocaleString()}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}