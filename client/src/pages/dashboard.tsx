import React from "react";
import { MarketOverview } from "@/components/market-overview";
import { PortfolioChart } from "@/components/portfolio-chart";
import { TradePanel } from "@/components/trade-panel";
import { TokenList } from "@/components/token-list";
import { SignalsPanel } from "@/components/signals-panel";
import { TopAgentsPanel } from "@/components/top-agents-panel";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Boysacc Terminal</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <MarketOverview />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <PortfolioChart />
        </div>
        <div className="space-y-4">
          <SignalsPanel />
          <TradePanel />
          <TopAgentsPanel />
        </div>
      </div>

      <TokenList />
    </div>
  );
}