"use client"

import { useState, useMemo } from "react"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { 
  ChevronDown, 
  Filter, 
  MoreHorizontal, 
  Search, 
  Star, 
  Users, 
  Check, 
  X, 
  Clock, 
  CalendarIcon, 
  BarChart2,
  Download,
  GripVertical,
  Flag,
  MessageCircle,
  PhoneCall
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend 
} from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Types for speaker entries
type BaseEntry = {
  id: string
  fullName: string
  submissionDate: string
  topic: string
  status: string
  priorTedTalk: string
  flagged: boolean
  notes: string
  rating: number
}

type ApplicationEntry = BaseEntry & {
  type: "application"
  mobilePhone: string
  wechatId: string
  gender: string
  job: string
}

type NominationEntry = BaseEntry & {
  type: "nomination"
  contact: string
  nominatedBy: string
}

type SpeakerEntry = ApplicationEntry | NominationEntry

// Mock data for speaker applications
const mockApplications: ApplicationEntry[] = [
  {
    id: "APP001",
    fullName: "Sarah Johnson",
    submissionDate: "2025-04-10",
    topic: "The Future of Sustainable Energy",
    mobilePhone: "+86 123 4567 8901",
    wechatId: "sarahjohnson",
    gender: "Female",
    job: "Energy Scientist",
    status: "under_review",
    priorTedTalk: "No",
    flagged: false,
    notes: "Strong candidate with relevant expertise",
    rating: 4,
    type: "application"
  },
  {
    id: "APP002",
    fullName: "Michael Zhang",
    submissionDate: "2025-04-08",
    topic: "AI Ethics in Healthcare",
    mobilePhone: "+86 132 9876 5432",
    wechatId: "mzhang",
    gender: "Male",
    job: "AI Researcher",
    status: "shortlisted",
    priorTedTalk: "Yes - TEDxShanghai 2023",
    flagged: true,
    notes: "Previous TED speaker, excellent presentation skills",
    rating: 5,
    type: "application"
  },
  {
    id: "APP003",
    fullName: "Olivia Chen",
    submissionDate: "2025-04-11",
    topic: "Rethinking Education for Gen Z",
    mobilePhone: "+86 139 5555 7777",
    wechatId: "olivia_chen",
    gender: "Female",
    job: "Education Consultant",
    status: "invited",
    priorTedTalk: "No",
    flagged: false,
    notes: "Fresh perspective on education reform",
    rating: 4,
    type: "application"
  },
  {
    id: "APP004",
    fullName: "David Lee",
    submissionDate: "2025-04-09",
    topic: "Blockchain Revolution in Supply Chain",
    mobilePhone: "+86 138 2222 3333",
    wechatId: "david_blockchain",
    gender: "Male",
    job: "Supply Chain Technologist",
    status: "rejected",
    priorTedTalk: "No",
    flagged: false,
    notes: "Topic too technical, needs refinement",
    rating: 2,
    type: "application"
  },
  {
    id: "APP005",
    fullName: "Emma Wilson",
    submissionDate: "2025-04-12",
    topic: "Mental Health in the Digital Age",
    mobilePhone: "+86 137 8888 9999",
    wechatId: "emma_w",
    gender: "Female",
    job: "Clinical Psychologist",
    status: "under_review",
    priorTedTalk: "No",
    flagged: true,
    notes: "Compelling personal story, needs coaching on delivery",
    rating: 3,
    type: "application"
  }
]

// Mock data for speaker nominations
const mockNominations: NominationEntry[] = [
  {
    id: "NOM001",
    fullName: "Dr. Wei Liu",
    submissionDate: "2025-04-07",
    topic: "Quantum Computing Breakthroughs",
    contact: "wei.liu@quantum.tech",
    nominatedBy: "James Wilson",
    status: "under_review",
    priorTedTalk: "No",
    flagged: true,
    notes: "Leading researcher in quantum computing",
    rating: 5,
    type: "nomination"
  },
  {
    id: "NOM002",
    fullName: "Sofia Rodriguez",
    submissionDate: "2025-04-09",
    topic: "Cultural Integration in Global Business",
    contact: "+86 135 6666 7777",
    nominatedBy: "Michael Chen",
    status: "contacted",
    priorTedTalk: "Yes - TEDxMadrid 2022",
    flagged: false,
    notes: "International perspective, multilingual speaker",
    rating: 4,
    type: "nomination"
  },
  {
    id: "NOM003",
    fullName: "Ahmed Hassan",
    submissionDate: "2025-04-10",
    topic: "Urban Planning for Climate Resilience",
    contact: "a.hassan@urbansolutions.org",
    nominatedBy: "Sarah Johnson",
    status: "shortlisted",
    priorTedTalk: "No",
    flagged: false,
    notes: "Innovative approaches to city design",
    rating: 4,
    type: "nomination"
  }
]

// Combined data for all entries
const allEntries: SpeakerEntry[] = [...mockApplications, ...mockNominations]

// Status badge component with better visual design
const StatusBadge = ({ status }: { status: string }) => {
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
const StatusSelect = ({ status, onChange }: { status: string, onChange: (value: string) => void }) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-transparent hover:border-gray-300 cursor-pointer transition-colors w-[130px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`w-2 h-2 rounded-full ${currentColor}`}></div>
          <span className="text-sm font-medium truncate">
            {status === "under_review" ? "Under Review" :
              status === "shortlisted" ? "Shortlisted" :
              status === "invited" ? "Invited" :
              status === "rejected" ? "Rejected" :
              status === "contacted" ? "Contacted" :
              status === "flagged" ? "Flagged" : "Unknown"}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem 
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("under_review");
          }}
        >
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <span>Under Review</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("shortlisted");
          }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span>Shortlisted</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("invited");
          }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Invited</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("contacted");
          }}
        >
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <span>Contacted</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("rejected");
          }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span>Rejected</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onChange("flagged");
          }}
        >
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          <span>Flagged</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Rating component
const Rating = ({ rating, onChange }: { rating: number, onChange?: (value: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div 
      className="flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors"
      onClick={(e) => e.stopPropagation()} // Prevent opening the modal when clicking on the container
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`
            ${star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            ${onChange ? "cursor-pointer transition-colors duration-150" : ""}
          `}
          onMouseEnter={() => onChange && setHoverRating(star)}
          onMouseLeave={() => onChange && setHoverRating(0)}
          onClick={(e) => {
            if (onChange) {
              e.stopPropagation();
              onChange(star);
            }
          }}
        />
      ))}
    </div>
  );
}

// Drag handle component for table rows
const DragHandle = ({ id }: { id: string }) => {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-muted-foreground hover:bg-transparent cursor-grab active:cursor-grabbing"
      onClick={(e) => e.stopPropagation()}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

// Draggable row component
function DraggableRow({ 
  entry, 
  openDetails,
  updateStatus,
  updateRating
}: { 
  entry: SpeakerEntry, 
  openDetails: (entry: SpeakerEntry) => void,
  updateStatus: (entryId: string, newStatus: string) => void,
  updateRating: (entryId: string, newRating: number) => void
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: entry.id,
  })

  return (
    <TableRow
      ref={setNodeRef}
      className={`relative z-0 ${entry.status === "flagged" ? "bg-red-50/70 dark:bg-red-900/20 text-foreground" : ""} ${isDragging ? "z-10 opacity-80" : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      onClick={() => openDetails(entry)}
    >
      <TableCell className="w-[30px] p-0">
        <DragHandle id={entry.id} />
      </TableCell>
      <TableCell className="font-medium">
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
      </TableCell>
      <TableCell>{entry.topic}</TableCell>
      <TableCell>{new Date(entry.submissionDate).toLocaleDateString()}</TableCell>
      <TableCell>
        <Badge variant={entry.type === "application" ? "default" : "secondary"}>
          {entry.type === "application" ? "Application" : "Nomination"}
        </Badge>
      </TableCell>
      <TableCell>
        <StatusSelect
          status={entry.status}
          onChange={(value) => updateStatus(entry.id, value)}
        />
      </TableCell>
      <TableCell>
        <Rating 
          rating={entry.rating} 
          onChange={(newRating) => updateRating(entry.id, newRating)}
        />
      </TableCell>
    </TableRow>
  )
}

// Status options for dropdown
const statusOptions = [
  { label: "Under Review", value: "under_review" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Invited", value: "invited" },
  { label: "Rejected", value: "rejected" },
  { label: "Contacted", value: "contacted" },
  { label: "Flagged", value: "flagged" },
]

export function SpeakerDashboardClient() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [entries, setEntries] = useState<SpeakerEntry[]>(allEntries)
  const [selectedEntry, setSelectedEntry] = useState<SpeakerEntry | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activities, setActivities] = useState<Array<{
    id: string;
    entryId: string;
    text: string;
    timestamp: Date;
    status: string;
    type: "application" | "nomination";
  }>>([])
  
  // DnD setup
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  
  // Stats - Using useState with stable initial values to prevent hydration mismatch
  const [applicationsSinceLastWeek] = useState(3)
  const [nominationsSinceLastWeek] = useState(1)
  const [percentageShortlisted] = useState(15)
  const [totalSlots] = useState(10)
  
  // Filter entries based on current filters and search query
  const filteredEntries = entries.filter(entry => {
    // Filter by type
    if (typeFilter !== "all" && entry.type !== typeFilter) return false
    
    // Filter by status
    if (statusFilter !== "all" && entry.status !== statusFilter) return false
    
    // Filter by search query
    if (searchQuery && !entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !entry.topic.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })
  
  // Calculate statistics
  const totalApplications = entries.filter(e => e.type === "application").length
  const totalNominations = entries.filter(e => e.type === "nomination").length
  const totalShortlisted = entries.filter(e => e.status === "shortlisted").length
  const totalInvited = entries.filter(e => e.status === "invited").length
  
  // Handle opening the modal for an entry
  const openDetails = (entry: SpeakerEntry) => {
    setSelectedEntry(entry)
    setDetailsOpen(true)
  }
  
  // Add activity when status changes
  const addActivity = (entryId: string, newStatus: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;
    
    let activityText = '';
    
    switch(newStatus) {
      case 'invited':
        activityText = `${entry.fullName} invited to audition`;
        break;
      case 'shortlisted':
        activityText = `${entry.fullName} shortlisted`;
        break;
      case 'rejected':
        activityText = `${entry.fullName} application rejected`;
        break;
      case 'flagged':
        activityText = `${entry.fullName} flagged for review`;
        break;
      case 'contacted':
        activityText = `${entry.fullName} contacted for more info`;
        break;
      case 'under_review':
        activityText = `${entry.fullName} set to under review`;
        break;
      default:
        activityText = `${entry.fullName} status updated to ${newStatus}`;
    }
    
    const newActivity = {
      id: `activity-${Date.now()}`,
      entryId: entry.id,
      text: activityText,
      timestamp: new Date(),
      status: newStatus,
      type: entry.type
    };
    
    setActivities(prevActivities => [newActivity, ...prevActivities.slice(0, 19)]);
  }
  
  // Update status of an entry
  const updateStatus = (entryId: string, newStatus: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (entry && entry.status !== newStatus) {
      addActivity(entryId, newStatus);
    }
    
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, status: newStatus } : entry
    ));
  }
  
  // Update rating of an entry
  const updateRating = (entryId: string, newRating: number) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, rating: newRating } : entry
    ))
  }
  
  // Toggle flagged status of an entry
  const toggleFlagged = (entryId: string) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, flagged: !entry.flagged } : entry
    ))
  }
  
  // Update notes for an entry
  const updateNotes = (entryId: string, newNotes: string) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, notes: newNotes } : entry
    ))
  }
  
  // Handle drag end event for reordering entries
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (active && over && active.id !== over.id) {
      setEntries((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
  
  // Prepare data for the pie chart
  const pieChartData = useMemo(() => {
    const statusCounts = entries.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
    }))
  }, [entries])
  
  const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE", "#FF4444", "#FFBB28"]
  
  // Generate activity data based on current entries
  const activityData = useMemo(() => {
    // Sort entries by submission date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
    );
    
    const activities = sortedEntries.slice(0, 5).map(entry => {
      const date = new Date(entry.submissionDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      let activityText = '';
      let icon;
      let bgColor = '';
      let iconColor = '';
      
      switch(entry.status) {
        case 'invited':
          activityText = `${entry.fullName} invited to audition`;
          icon = <Check className="h-4 w-4" />;
          bgColor = 'bg-green-100 dark:bg-green-900/30';
          iconColor = 'text-green-600 dark:text-green-400';
          break;
        case 'shortlisted':
          activityText = `${entry.fullName} shortlisted`;
          icon = <Star className="h-4 w-4" />;
          bgColor = 'bg-blue-100 dark:bg-blue-900/30';
          iconColor = 'text-blue-600 dark:text-blue-400';
          break;
        case 'rejected':
          activityText = `${entry.fullName} application rejected`;
          icon = <X className="h-4 w-4" />;
          bgColor = 'bg-red-100 dark:bg-red-900/30';
          iconColor = 'text-red-600 dark:text-red-400';
          break;
        case 'flagged':
          activityText = `${entry.fullName} flagged for review`;
          icon = <Flag className="h-4 w-4" />;
          bgColor = 'bg-orange-100 dark:bg-orange-900/30';
          iconColor = 'text-orange-600 dark:text-orange-400';
          break;
        case 'contacted':
          activityText = `${entry.fullName} contacted for more info`;
          icon = <PhoneCall className="h-4 w-4" />;
          bgColor = 'bg-purple-100 dark:bg-purple-900/30';
          iconColor = 'text-purple-600 dark:text-purple-400';
          break;
        default:
          activityText = `New ${entry.type} from ${entry.fullName}`;
          icon = <Clock className="h-4 w-4" />;
          bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
          iconColor = 'text-yellow-600 dark:text-yellow-400';
      }
      
      let timeText;
      if (diffDays === 0) {
        timeText = 'Today';
      } else if (diffDays === 1) {
        timeText = 'Yesterday';
      } else if (diffDays < 7) {
        timeText = `${diffDays} days ago`;
      } else {
        timeText = date.toLocaleDateString();
      }
      
      return {
        id: entry.id,
        text: activityText,
        date: entry.submissionDate,
        timeText,
        icon,
        bgColor,
        iconColor,
        type: entry.type,
      };
    });
    
    return activities;
  }, [entries]);

  return (
    <div className="container mx-auto py-24 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Speaker Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage speaker applications and nominations
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{applicationsSinceLastWeek} since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Nominations</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNominations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{nominationsSinceLastWeek} since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShortlisted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {percentageShortlisted}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invited to Speak</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvited}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalInvited} out of {totalSlots} slots filled
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="nominations">Nominations</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or topic..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="p-2">
                  <p className="text-sm font-medium mb-1">Status</p>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="invited">Invited</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-2">
                  <p className="text-sm font-medium mb-1">Type</p>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="application">Applications</SelectItem>
                      <SelectItem value="nomination">Nominations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setStatusFilter("all")
                      setTypeFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Speaker Entries</CardTitle>
              <CardDescription>
                Showing {filteredEntries.length} out of {entries.length} total entries
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={filteredEntries.map(entry => entry.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No entries found matching your filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEntries.map((entry) => (
                          <DraggableRow 
                            key={entry.id} 
                            entry={entry}
                            openDetails={openDetails}
                            updateStatus={updateStatus}
                            updateRating={updateRating}
                          />
                        ))
                      )}
                    </TableBody>
                  </Table>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Speaker Applications</CardTitle>
              <CardDescription>
                Showing {filteredEntries.filter(e => e.type === "application").length} out of {totalApplications} total applications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={filteredEntries.filter(e => e.type === "application").map(entry => entry.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.filter(e => e.type === "application").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No applications found matching your filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEntries
                          .filter((e): e is ApplicationEntry => e.type === "application")
                          .map((entry) => (
                            <DraggableRow 
                              key={entry.id} 
                              entry={entry}
                              openDetails={openDetails}
                              updateStatus={updateStatus}
                              updateRating={updateRating}
                            />
                          ))
                      )}
                    </TableBody>
                  </Table>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nominations">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Speaker Nominations</CardTitle>
              <CardDescription>
                Showing {filteredEntries.filter(e => e.type === "nomination").length} out of {totalNominations} total nominations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={filteredEntries.filter(e => e.type === "nomination").map(entry => entry.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Nominated By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.filter(e => e.type === "nomination").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No nominations found matching your filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEntries
                          .filter((e): e is NominationEntry => e.type === "nomination")
                          .map((entry) => (
                            <DraggableRow 
                              key={entry.id} 
                              entry={entry}
                              openDetails={openDetails}
                              updateStatus={updateStatus}
                              updateRating={updateRating}
                            />
                          ))
                      )}
                    </TableBody>
                  </Table>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Bottom Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
              <span>Application Status Overview</span>
            </CardTitle>
            <CardDescription>
              Distribution of speakers by current status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    fill="#8884d8"
                  >
                    {pieChartData.map((entry, index) => {
                      // Map the status values to friendly names for the legend
                      const statusName = entry.name === "under_review" ? "Under Review" :
                        entry.name === "shortlisted" ? "Shortlisted" :
                        entry.name === "invited" ? "Invited" :
                        entry.name === "rejected" ? "Rejected" :
                        entry.name === "contacted" ? "Contacted" :
                        entry.name === "flagged" ? "Flagged" : entry.name;
                      
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          className="stroke-background stroke-2 hover:opacity-90 transition-opacity"
                          name={statusName}
                        />
                      )
                    })}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any, name: any) => {
                      // Map the status values to friendly names for the tooltip
                      const statusName = name === "under_review" ? "Under Review" :
                        name === "shortlisted" ? "Shortlisted" :
                        name === "invited" ? "Invited" :
                        name === "rejected" ? "Rejected" :
                        name === "contacted" ? "Contacted" :
                        name === "flagged" ? "Flagged" : name;
                      
                      return [`${value} speaker${value !== 1 ? 's' : ''}`, statusName];
                    }}
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      color: 'var(--foreground)'
                    }}
                    labelStyle={{
                      color: 'var(--foreground)'
                    }}
                    itemStyle={{
                      color: 'var(--foreground)'
                    }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ paddingTop: 20 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates on speakers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {activities.length > 0 ? (
                activities.map(activity => {
                  // Find the corresponding entry
                  const entry = entries.find(e => e.id === activity.entryId);
                  if (!entry) return null;
                  
                  // Generate visual elements based on status
                  let icon;
                  let bgColor = '';
                  let iconColor = '';
                  
                  switch(activity.status) {
                    case 'invited':
                      icon = <Check className="h-4 w-4" />;
                      bgColor = 'bg-green-100 dark:bg-green-900/30';
                      iconColor = 'text-green-600 dark:text-green-400';
                      break;
                    case 'shortlisted':
                      icon = <Star className="h-4 w-4" />;
                      bgColor = 'bg-blue-100 dark:bg-blue-900/30';
                      iconColor = 'text-blue-600 dark:text-blue-400';
                      break;
                    case 'rejected':
                      icon = <X className="h-4 w-4" />;
                      bgColor = 'bg-red-100 dark:bg-red-900/30';
                      iconColor = 'text-red-600 dark:text-red-400';
                      break;
                    case 'flagged':
                      icon = <Flag className="h-4 w-4" />;
                      bgColor = 'bg-orange-100 dark:bg-orange-900/30';
                      iconColor = 'text-orange-600 dark:text-orange-400';
                      break;
                    case 'contacted':
                      icon = <PhoneCall className="h-4 w-4" />;
                      bgColor = 'bg-purple-100 dark:bg-purple-900/30';
                      iconColor = 'text-purple-600 dark:text-purple-400';
                      break;
                    default:
                      icon = <Clock className="h-4 w-4" />;
                      bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
                      iconColor = 'text-yellow-600 dark:text-yellow-400';
                  }
                  
                  // Format timestamp
                  const now = new Date();
                  const timestamp = activity.timestamp;
                  const diffMs = now.getTime() - timestamp.getTime();
                  const diffMins = Math.floor(diffMs / 60000);
                  const diffHours = Math.floor(diffMins / 60);
                  const diffDays = Math.floor(diffHours / 24);
                  
                  let timeText;
                  if (diffMins < 1) {
                    timeText = 'Just now';
                  } else if (diffMins < 60) {
                    timeText = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
                  } else if (diffHours < 24) {
                    timeText = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
                  } else if (diffDays === 1) {
                    timeText = 'Yesterday';
                  } else {
                    timeText = timestamp.toLocaleDateString();
                  }
                  
                  return (
                    <div key={activity.id} className="flex items-start gap-4 group cursor-default animate-fadeIn">
                      <div className={`rounded-full p-2 ${bgColor} transition-transform group-hover:scale-110`}>
                        <div className={iconColor}>
                          {icon}
                        </div>
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">{timeText}</p>
                          <Badge 
                            variant="outline" 
                            className={activity.type === "application" ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" 
                              : "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"}
                          >
                            {activity.type === "application" ? "Application" : "Nomination"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : activityData.length > 0 ? (
                // Show initial activity data if there are no status change activities yet
                activityData.map(activity => (
                  <div key={activity.id} className="flex items-start gap-4 group cursor-default">
                    <div className={`rounded-full p-2 ${activity.bgColor} transition-transform group-hover:scale-110`}>
                      <div className={activity.iconColor}>
                        {activity.icon}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{activity.timeText}</p>
                        <Badge 
                          variant="outline" 
                          className={activity.type === "application" ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" 
                            : "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"}
                        >
                          {activity.type === "application" ? "Application" : "Nomination"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEntry && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10">
                      {selectedEntry.fullName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedEntry.fullName}</DialogTitle>
                    <DialogDescription>
                      {selectedEntry.type === "application" 
                        ? `${selectedEntry.job} • ${selectedEntry.gender}`
                        : `Nominated by ${selectedEntry.nominatedBy}`
                      }
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Entry Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Topic</p>
                      <p>{selectedEntry.topic}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Prior TED/TEDx Experience</p>
                      <p>{selectedEntry.priorTedTalk}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Submission Date</p>
                      <p>{new Date(selectedEntry.submissionDate).toLocaleDateString()}</p>
                    </div>
                    
                    {selectedEntry.type === "application" && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
                          <p>Mobile: {selectedEntry.mobilePhone}</p>
                          <p>WeChat: {selectedEntry.wechatId}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedEntry.type === "nomination" && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
                          <p>{selectedEntry.contact}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Review & Status</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                      <Select
                        value={selectedEntry.status}
                        onValueChange={(value) => updateStatus(selectedEntry.id, value)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue>
                            <StatusBadge status={selectedEntry.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rating</p>
                      <div className="mt-1">
                        <Rating 
                          rating={selectedEntry.rating} 
                          onChange={(newRating) => updateRating(selectedEntry.id, newRating)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Notes</p>
                      <Textarea 
                        className="mt-1"
                        value={selectedEntry.notes}
                        onChange={(e) => updateNotes(selectedEntry.id, e.target.value)}
                        placeholder="Add your notes about this speaker..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex gap-2 md:gap-0 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setDetailsOpen(false)}
                >
                  Close
                </Button>
                
                <Button
                  onClick={() => setDetailsOpen(false)}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}