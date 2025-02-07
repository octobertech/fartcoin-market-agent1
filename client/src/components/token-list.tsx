import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import type { Token, Analysis } from "@shared/schema";

export function TokenList() {
  const { data: tokens } = useQuery<Token[]>({
    queryKey: ["/api/tokens"],
  });

  const { data: analyses } = useQuery<Analysis[]>({
    queryKey: ["/api/analyses"],
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h Change</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens?.map((token) => {
            const analysis = analyses?.find(
              (a) => a.tokenSymbol === token.symbol
            );
            return (
              <TableRow key={token.symbol}>
                <TableCell className="font-medium">{token.symbol}</TableCell>
                <TableCell>${token.price.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    token.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {token.change24h.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {analysis ? (analysis.sentiment * 100).toFixed(0) : "N/A"}%
                </TableCell>
                <TableCell className="capitalize">
                  {analysis?.recommendation || "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
