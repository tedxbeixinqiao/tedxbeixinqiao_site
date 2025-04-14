"use client"

import { useState, useMemo } from "react"
import { 
  BarChart2, 
  Search, 
  Filter, 
  ChevronDown, 
  Download,
  Clock,
  Users,
  Star,
  Check,
  CalendarIcon,
  Flag,
  PhoneCall,
  X
} from "lucide-react"
import { ColumnFiltersState, Row, SortingState, VisibilityState } from "@tanstack/react-table"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts"

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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import { SpeakerEntry, allEntries, ApplicationEntry, NominationEntry, statusOptions } from "@/components/dashboard/types"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Rating } from "@/components/dashboard/rating"
import { columns } from "@/components/dashboard/columns"

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
  const [bulkActionOpen, setBulkActionOpen] = useState(false)
  const [selectedEntries, setSelectedEntries] = useState<string[]>([])
  
  // TanStack Table states
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  
  // Stats - Using useState with stable initial values to prevent hydration mismatch
  const [applicationsSinceLastWeek] = useState(3)
  const [nominationsSinceLastWeek] = useState(1)
  const [percentageShortlisted] = useState(15)
  const [totalSlots] = useState(10)
  
  // Filter entries based on current filters and search query
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
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
  }, [entries, typeFilter, statusFilter, searchQuery])
  
  // Calculate statistics
  const totalApplications = entries.filter(e => e.type === "application").length
  const totalNominations = entries.filter(e => e.type === "nomination").length
  const totalShortlisted = entries.filter(e => e.status === "shortlisted").length
  const totalInvited = entries.filter(e => e.status === "invited").length
  
  // Handle opening the modal for an entry
  const openDetails = (row: Row<SpeakerEntry>) => {
    setSelectedEntry(row.original)
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
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
  
  // Update notes for an entry
  const updateNotes = (entryId: string, newNotes: string) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, notes: newNotes } : entry
    ))
  }
  
  // Generate activity data based on current entries
  const activityData = useMemo(() => {
    // Sort entries by submission date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
    );
    
    return sortedEntries.slice(0, 5).map(entry => {
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
            {/* Add bulk action button */}
            {Object.keys(rowSelection).length > 0 && (
              <Button 
                variant="default" 
                onClick={() => setBulkActionOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Bulk Update ({Object.keys(rowSelection).length})
              </Button>
            )}
            
            {/* Column visibility dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Columns
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {columns
                  .filter(column => column.id !== 'drag' && column.id !== 'select')
                  .map(column => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.id ? columnVisibility[column.id] !== false : false}
                        onCheckedChange={(checked) => {
                          if (column.id) {
                            setColumnVisibility(prev => ({
                              ...prev,
                              [column.id as string]: checked
                            }))
                          }
                        }}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })
                }
              </DropdownMenuContent>
            </DropdownMenu>
            
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
              <DataTable
                columns={columns}
                data={filteredEntries}
                onRowClick={openDetails}
                updateStatus={updateStatus}
                updateRating={updateRating}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
              />
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
              <DataTable
                columns={columns}
                data={filteredEntries.filter(e => e.type === "application")}
                onRowClick={openDetails}
                updateStatus={updateStatus}
                updateRating={updateRating}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
              />
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
              <DataTable
                columns={columns}
                data={filteredEntries.filter(e => e.type === "nomination")}
                onRowClick={openDetails}
                updateStatus={updateStatus}
                updateRating={updateRating}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Activity Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
              <span>Entry Status Distribution</span>
            </CardTitle>
            <CardDescription>Current state of applications and nominations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Under Review', value: entries.filter(e => e.status === 'under_review').length, color: '#EAB308' },
                      { name: 'Shortlisted', value: entries.filter(e => e.status === 'shortlisted').length, color: '#3B82F6' },
                      { name: 'Invited', value: entries.filter(e => e.status === 'invited').length, color: '#22C55E' },
                      { name: 'Rejected', value: entries.filter(e => e.status === 'rejected').length, color: '#EF4444' },
                      { name: 'Contacted', value: entries.filter(e => e.status === 'contacted').length, color: '#8B5CF6' },
                      { name: 'Flagged', value: entries.filter(e => e.status === 'flagged').length, color: '#F97316' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {entries
                      .map(entry => entry.status)
                      .filter((value, index, self) => self.indexOf(value) === index)
                      .map((status, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            status === 'under_review' ? '#EAB308' :
                            status === 'shortlisted' ? '#3B82F6' :
                            status === 'invited' ? '#22C55E' :
                            status === 'rejected' ? '#EF4444' :
                            status === 'contacted' ? '#8B5CF6' :
                            status === 'flagged' ? '#F97316' : '#94A3B8'
                          }
                        />
                      ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} entries`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-xs">{value}</span>}
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
                        ? `${(selectedEntry as ApplicationEntry).job} • ${(selectedEntry as ApplicationEntry).gender}`
                        : `Nominated by ${(selectedEntry as NominationEntry).nominatedBy}`
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
                          <p>Mobile: {(selectedEntry as ApplicationEntry).mobilePhone}</p>
                          <p>WeChat: {(selectedEntry as ApplicationEntry).wechatId}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedEntry.type === "nomination" && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
                          <p>{(selectedEntry as NominationEntry).contact}</p>
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

      {/* Bulk Action Modal */}
      <Dialog open={bulkActionOpen} onOpenChange={setBulkActionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Update Status</DialogTitle>
            <DialogDescription>
              Update status for {Object.keys(rowSelection).length} selected {Object.keys(rowSelection).length === 1 ? "entry" : "entries"}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-status">New Status</Label>
              <Select onValueChange={(value) => {
                // Get the current visible data based on active tab
                let dataToUse = filteredEntries;
                
                if (activeTab === "applications") {
                  dataToUse = filteredEntries.filter(e => e.type === "application");
                } else if (activeTab === "nominations") {
                  dataToUse = filteredEntries.filter(e => e.type === "nomination");
                }
                
                // Convert row indices to actual entry objects
                const selectedEntryIds = Object.keys(rowSelection)
                  .map(index => {
                    const idx = parseInt(index);
                    return idx >= 0 && idx < dataToUse.length ? dataToUse[idx].id : null;
                  })
                  .filter(Boolean) as string[];
                
                // Log for debugging
                console.log(`Bulk updating ${selectedEntryIds.length} entries to status: ${value}`);
                
                // Update each selected entry
                selectedEntryIds.forEach(id => {
                  updateStatus(id, value);
                });
                
                // Close dialog and clear selection
                setBulkActionOpen(false);
                setRowSelection({});
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          option.value === "under_review" ? "bg-yellow-400" :
                          option.value === "shortlisted" ? "bg-blue-400" :
                          option.value === "invited" ? "bg-green-500" :
                          option.value === "rejected" ? "bg-red-500" :
                          option.value === "contacted" ? "bg-purple-400" :
                          option.value === "flagged" ? "bg-orange-400" : "bg-gray-400"
                        }`}></div>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setBulkActionOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setRowSelection({});
                setBulkActionOpen(false);
              }}
            >
              Clear Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}