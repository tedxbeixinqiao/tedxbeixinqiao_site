"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"

import { SpeakerEntry } from "./types"
import { Rating } from "./rating"
import { StatusSelect } from "./status-badge"
import { DragHandle } from "./data-table"

// Define the table meta type to include our custom functions
type SpeakerTableMeta = {
  updateStatus?: (id: string, status: string) => void;
  updateRating?: (id: string, rating: number) => void;
}

// Define columns for the speaker table
export const columns: ColumnDef<SpeakerEntry>[] = [
  {
    id: "drag",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    id: "name",
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronDown
            className={`ml-1 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      )
    },
    cell: ({ row }) => {
      const entry = row.original
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10">
              {entry.fullName.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium hover:underline">{entry.fullName}</div>
            <div className="text-xs text-muted-foreground">
              {entry.type === "application" ? entry.job : "Nominee"}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: "topic",
    accessorKey: "topic",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Topic
          <ChevronDown
            className={`ml-1 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      )
    },
    cell: ({ row }) => row.original.topic
  },
  {
    id: "date",
    accessorKey: "submissionDate",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ChevronDown
            className={`ml-1 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      )
    },
    cell: ({ row }) => new Date(row.original.submissionDate).toLocaleDateString()
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ChevronDown
            className={`ml-1 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      )
    },
    cell: ({ row }) => (
      <Badge variant={row.original.type === "application" ? "default" : "secondary"}>
        {row.original.type === "application" ? "Application" : "Nomination"}
      </Badge>
    )
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronDown
            className={`ml-1 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      )
    },
    cell: ({ row, table }) => {
      // Using the meta data to access the update function
      const updateStatus = (table.options.meta as SpeakerTableMeta)?.updateStatus
      
      return (
        <StatusSelect
          status={row.original.status}
          onChange={(value) => {
            if (updateStatus) {
              updateStatus(row.original.id, value)
            }
          }}
        />
      )
    }
  },
  {
    id: "rating",
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ChevronDown
            className={`ml-1 h-4 w-4 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      )
    },
    cell: ({ row, table }) => {
      // Using the meta data to access the update function
      const updateRating = (table.options.meta as SpeakerTableMeta)?.updateRating
      
      return (
        <Rating 
          rating={row.original.rating} 
          onChange={(newRating) => {
            if (updateRating) {
              updateRating(row.original.id, newRating)
            }
          }}
        />
      )
    }
  }
]