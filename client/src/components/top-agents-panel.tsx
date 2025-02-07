
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import type { AgentMetrics } from "@shared/schema";

export function TopAgentsPanel() {
  const { data: agents } = useQuery<AgentMetrics[]>({
    queryKey: ["/api/agents"],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents?.slice(0, 5).map((agent) => (
            <div key={agent.agentName} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{agent.agentName}</h3>
                <Badge variant="secondary">${agent.marketCap.toLocaleString()}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="ml-1">${agent.price.toFixed(8)}</span>
                  <span className={`ml-1 ${agent.priceDeltaPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ({agent.priceDeltaPercent.toFixed(2)}%)
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Liquidity:</span>
                  <span className="ml-1">${agent.liquidity.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mindshare:</span>
                  <span className="ml-1">{agent.mindshare.toFixed(2)}</span>
                  <span className={`ml-1 ${agent.mindshareDeltaPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ({agent.mindshareDeltaPercent.toFixed(2)}%)
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="ml-1">${agent.volume24Hours.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
