import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Analysis } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function SignalsPanel() {
  const { data: analyses } = useQuery<Analysis[]>({
    queryKey: ["/api/analyses"],
  });

  const latestAnalysis = analyses?.find(a => a.tokenSymbol === "FART");

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return "bg-green-500";
    if (confidence >= 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "buy": return "bg-green-500";
      case "sell": return "bg-red-500";
      default: return "bg-yellow-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>FART Token Signals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {latestAnalysis ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Token</span>
                <Badge variant="outline">{latestAnalysis.tokenSymbol}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Recommendation</span>
                <Badge className={getRecommendationColor(latestAnalysis.recommendation)}>
                  {latestAnalysis.recommendation.toUpperCase()}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Confidence</span>
                <Badge className={getConfidenceColor(Number(latestAnalysis.confidence))}>
                  {(Number(latestAnalysis.confidence) * 100).toFixed(0)}%
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sentiment</span>
                <Badge className={getConfidenceColor(Number(latestAnalysis.sentiment))}>
                  {(Number(latestAnalysis.sentiment) * 100).toFixed(0)}%
                </Badge>
              </div>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Analysis based on top agent trading patterns
                </AlertDescription>
              </Alert>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              No FART token signals available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}