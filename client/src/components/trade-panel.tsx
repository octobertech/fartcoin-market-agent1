import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function TradePanel() {
  const [amount, setAmount] = React.useState("");
  const [type, setType] = React.useState<"buy" | "sell">("buy");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: executeTrade } = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/trades", {
        tokenSymbol: "FART",
        type,
        amount: parseFloat(amount),
        price: 0.00001234, // Mock price for now
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trades"] });
      toast({
        title: "Trade Executed",
        description: `Successfully ${type} ${amount} FART`,
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade FART Token</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={type} onValueChange={(v) => setType(v as "buy" | "sell")}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={() => executeTrade()}
            disabled={!amount}
          >
            Execute {type.toUpperCase()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}