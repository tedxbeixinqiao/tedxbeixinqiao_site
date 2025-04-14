"use client"

import React from "react"

// Status badge component with better visual design
export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "under_review":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <span className="text-sm font-medium">Under Review</span>
        </div>
      )
    case "shortlisted":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-sm font-medium">Shortlisted</span>
        </div>
      )
    case "invited":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">Invited</span>
        </div>
      )
    case "rejected":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium">Rejected</span>
        </div>
      )
    case "contacted":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <span className="text-sm font-medium">Contacted</span>
        </div>
      )
    case "flagged":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          <span className="text-sm font-medium">Flagged</span>
        </div>
      )
    default:
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-sm font-medium">Unknown</span>
        </div>
      )
  }
}

// Status select component for table cells
export const StatusSelect = ({ status, onChange }: { status: string, onChange: (value: string) => void }) => {
  const statusColors = {
    under_review: "bg-yellow-400",
    shortlisted: "bg-blue-400",
    invited: "bg-green-500",
    rejected: "bg-red-500", 
    contacted: "bg-purple-400",
    flagged: "bg-orange-400"
  }
  
  const currentColor = statusColors[status as keyof typeof statusColors] || "bg-gray-400"
  
  return (
    <div 
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`w-2 h-2 rounded-full ${currentColor}`}></div>
      <select 
        className="bg-transparent border-none outline-none cursor-pointer text-sm font-medium pr-8"
        value={status}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      >
        <option value="under_review">Under Review</option>
        <option value="shortlisted">Shortlisted</option>
        <option value="invited">Invited</option>
        <option value="contacted">Contacted</option>
        <option value="rejected">Rejected</option>
        <option value="flagged">Flagged</option>
      </select>
    </div>
  )
}