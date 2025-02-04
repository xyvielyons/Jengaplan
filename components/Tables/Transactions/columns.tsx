"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id:string,
  bankId:string,
  amount:number,
  OrderTrackingId:string,
  OrderMerchantReference:string,
  createdAt:string,
  updatedAt:string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "OrderTrackingId",
    header: "Tracking-Id",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  
  {
    accessorKey: "createdAt1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value:any = row.getValue("createdAt");
  
      function extractDate(isoString: string): string {
        if (!isoString) return "N/A"; // Handle null/undefined cases
        return new Date(isoString).toISOString().split("T")[0]; // Convert to ISO string and extract date
      }
  
      return <p>{extractDate(value)}</p>;
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value:any = row.getValue("createdAt");
  
      function extractTime(isoString: string): string {
        if (!isoString) return "N/A"; // Handle null/undefined cases
        return new Date(isoString).toISOString().split("T")[1].split(".")[0]; // Extract time (HH:MM:SS)
      }
  
      return <p>{extractTime(value)}</p>;
    }
  }
]
