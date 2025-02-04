"use client"

import { ColumnDef } from "@tanstack/react-table"

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
    header: "TrackingId",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
]
