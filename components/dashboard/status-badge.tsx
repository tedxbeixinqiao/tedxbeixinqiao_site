"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Status badge component with better visual design
export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "under_review":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <span className="text-sm font-medium">Under Review</span>
        </div>
      );
    case "shortlisted":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-sm font-medium">Shortlisted</span>
        </div>
      );
    case "invited":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">Invited</span>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium">Rejected</span>
        </div>
      );
    case "contacted":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <span className="text-sm font-medium">Contacted</span>
        </div>
      );
    case "flagged":
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          <span className="text-sm font-medium">Flagged</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-sm font-medium">Unknown</span>
        </div>
      );
  }
};

// Create a styled item for status dropdown
const StatusItem = ({ value, label }: { value: string; label: string }) => {
  const getColor = () => {
    switch (value) {
      case "under_review":
        return "bg-yellow-400";
      case "shortlisted":
        return "bg-blue-400";
      case "invited":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "contacted":
        return "bg-purple-400";
      case "flagged":
        return "bg-orange-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getColor()}`}></div>
      <span>{label}</span>
    </div>
  );
};

// Status select component for table cells - using shadcn UI styling
export const StatusSelect = ({
  status,
  onChange,
}: {
  status: string;
  onChange: (value: string) => void;
}) => {
  const handleValueChange = (value: string) => {
    onChange(value);
  };

  // To prevent opening the row detail modal when clicking on the status dropdown
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick} className="min-w-[140px]">
      <Select value={status} onValueChange={handleValueChange}>
        <SelectTrigger className="h-8 min-h-8 border-none bg-transparent shadow-none focus:ring-0 py-0">
          <SelectValue>
            <StatusBadge status={status} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="under_review">
            <StatusItem value="under_review" label="Under Review" />
          </SelectItem>
          <SelectItem value="shortlisted">
            <StatusItem value="shortlisted" label="Shortlisted" />
          </SelectItem>
          <SelectItem value="invited">
            <StatusItem value="invited" label="Invited" />
          </SelectItem>
          <SelectItem value="contacted">
            <StatusItem value="contacted" label="Contacted" />
          </SelectItem>
          <SelectItem value="rejected">
            <StatusItem value="rejected" label="Rejected" />
          </SelectItem>
          <SelectItem value="flagged">
            <StatusItem value="flagged" label="Flagged" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
