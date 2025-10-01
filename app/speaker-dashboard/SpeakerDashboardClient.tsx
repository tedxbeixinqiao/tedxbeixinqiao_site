"use client";

import { useState, useMemo, useEffect } from "react";
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
  X,
  LogOut,
  PlusCircle,
  Edit,
} from "lucide-react";
import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  SpeakerEntry,
  ApplicationEntry,
  NominationEntry,
  statusOptions,
} from "@/components/dashboard/types";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Rating } from "@/components/dashboard/rating";
import { columns } from "@/components/dashboard/columns";
import {
  updateApplicationStatus,
  updateNominationStatus,
  updateApplicationRating,
  updateNominationRating,
  updateApplicationNotes,
  updateNominationNotes,
  toggleApplicationFlag,
  toggleNominationFlag,
  createDashboardApplication,
  createDashboardNomination,
  updateApplicationDetails,
  updateNominationDetails,
} from "@/lib/speakers-db-service";
import { toast } from "sonner";

// Add interface for the SpeakerDashboardClient props
interface SpeakerDashboardClientProps {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
    [key: string]: any;
  };
  initialEntries: SpeakerEntry[];
}

export function SpeakerDashboardClient({
  user,
  initialEntries,
}: SpeakerDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>(["all"]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [entries, setEntries] = useState<SpeakerEntry[]>(initialEntries);
  const [selectedEntry, setSelectedEntry] = useState<SpeakerEntry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activities, setActivities] = useState<
    Array<{
      id: string;
      entryId: string;
      text: string;
      timestamp: Date;
      status: string;
      type: "application" | "nomination";
    }>
  >([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newBulkStatus, setNewBulkStatus] = useState("");

  // Entry form states
  const [entryFormOpen, setEntryFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [entryType, setEntryType] = useState<"application" | "nomination">(
    "application"
  );
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    topic: "",
    priorTedTalk: "",
    status: "under_review",
    // Application specific
    mobilePhone: "",
    wechatId: "",
    gender: "Male",
    job: "",
    // Nomination specific
    contact: "",
    nominatedBy: "",
  });

  const router = useRouter();

  // TanStack Table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Table instances for pagination control
  const [allEntriesTable, setAllEntriesTable] = useState<any>(null);
  const [applicationsTable, setApplicationsTable] = useState<any>(null);
  const [nominationsTable, setNominationsTable] = useState<any>(null);

  // Force re-render states for pagination updates
  const [, forceUpdate] = useState({});
  const triggerUpdate = () => forceUpdate({});

  // Stats - Using recent entries data to calculate changes
  const oneWeekAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const applicationsSinceLastWeek = useMemo(() => {
    return entries.filter(
      (e) => e.type === "application" && new Date(e.submissionDate) > oneWeekAgo
    ).length;
  }, [entries, oneWeekAgo]);

  const nominationsSinceLastWeek = useMemo(() => {
    return entries.filter(
      (e) => e.type === "nomination" && new Date(e.submissionDate) > oneWeekAgo
    ).length;
  }, [entries, oneWeekAgo]);

  const totalSlots = 10;

  // Filter entries based on current filters and search query
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Filter by type
      if (typeFilter !== "all" && entry.type !== typeFilter) return false;

      // Filter by status - only filter if we have specific statuses selected (not "all")
      if (!statusFilter.includes("all") && !statusFilter.includes(entry.status))
        return false;

      // Filter by search query
      if (
        searchQuery &&
        !entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !entry.topic.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [entries, typeFilter, statusFilter, searchQuery]);

  // Calculate statistics
  const totalApplications = entries.filter(
    (e) => e.type === "application"
  ).length;
  const totalNominations = entries.filter(
    (e) => e.type === "nomination"
  ).length;
  const totalShortlisted = entries.filter(
    (e) => e.status === "shortlisted"
  ).length;
  const totalInvited = entries.filter((e) => e.status === "invited").length;
  const percentageShortlisted =
    totalApplications + totalNominations > 0
      ? Math.round(
          (totalShortlisted / (totalApplications + totalNominations)) * 100
        )
      : 0;

  // Handle opening the modal for an entry
  const openDetails = (row: Row<SpeakerEntry>) => {
    setSelectedEntry(row.original);
    setDetailsOpen(true);

    // Reset edit mode
    setEditMode(false);
  };

  // Open the edit entry form for an existing entry
  const openEditForm = (entry: SpeakerEntry) => {
    setSelectedEntry(entry);

    // Initialize form data with entry values
    if (entry.type === "application") {
      const appEntry = entry as ApplicationEntry;
      setFormData({
        fullName: appEntry.fullName,
        topic: appEntry.topic,
        priorTedTalk: appEntry.priorTedTalk || "",
        status: appEntry.status,
        mobilePhone: appEntry.mobilePhone,
        wechatId: appEntry.wechatId,
        gender: appEntry.gender ?? "Not specified",
        job: appEntry.job,
        contact: "",
        nominatedBy: "",
      });
    } else {
      const nomEntry = entry as NominationEntry;
      setFormData({
        fullName: nomEntry.fullName,
        topic: nomEntry.topic,
        priorTedTalk: nomEntry.priorTedTalk || "",
        status: nomEntry.status,
        mobilePhone: "",
        wechatId: "",
        gender: "Male",
        job: "",
        contact: nomEntry.contact,
        nominatedBy: nomEntry.nominatedBy,
      });
    }

    setEditMode(true);
    setEntryFormOpen(true);
  };

  // Add activity when status changes
  const addActivity = (entryId: string, newStatus: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;

    let activityText = "";

    switch (newStatus) {
      case "invited":
        activityText = `${entry.fullName} invited to audition`;
        break;
      case "shortlisted":
        activityText = `${entry.fullName} shortlisted`;
        break;
      case "rejected":
        activityText = `${entry.fullName} application rejected`;
        break;
      case "flagged":
        activityText = `${entry.fullName} flagged for review`;
        break;
      case "contacted":
        activityText = `${entry.fullName} contacted for more info`;
        break;
      case "under_review":
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
      type: entry.type,
    };

    setActivities((prevActivities) => [
      newActivity,
      ...prevActivities.slice(0, 19),
    ]);
  };

  // Update status of an entry
  const updateStatus = async (entryId: string, newStatus: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry || entry.status === newStatus) return;

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await updateApplicationStatus(entryId, newStatus)
          : await updateNominationStatus(entryId, newStatus);

      if (!result.success) {
        throw new Error(`Failed to update status for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      addActivity(entryId, newStatus);
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, status: newStatus } : entry
        )
      );

      toast.success("Status updated", {
        description: `${entry.fullName}'s status was updated to ${newStatus.replace("_", " ")}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Update failed", {
        description:
          "There was an error updating the status. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Update rating of an entry
  const updateRating = async (entryId: string, newRating: number) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry || entry.rating === newRating) return;

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await updateApplicationRating(entryId, newRating)
          : await updateNominationRating(entryId, newRating);

      if (!result.success) {
        throw new Error(`Failed to update rating for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, rating: newRating } : entry
        )
      );

      toast.success("Rating updated", {
        description: `${entry.fullName}'s rating was updated to ${newRating}`,
      });
    } catch (error) {
      console.error("Error updating rating:", error);
      toast.error("Update failed", {
        description:
          "There was an error updating the rating. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Update notes for an entry
  const updateNotes = async (entryId: string, newNotes: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry || entry.notes === newNotes) return;

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await updateApplicationNotes(entryId, newNotes)
          : await updateNominationNotes(entryId, newNotes);

      if (!result.success) {
        throw new Error(`Failed to update notes for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, notes: newNotes } : entry
        )
      );

      toast.success("Notes updated", {
        description: `Notes for ${entry.fullName} were saved successfully`,
      });
    } catch (error) {
      console.error("Error updating notes:", error);
      toast.error("Update failed", {
        description: "There was an error updating the notes. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle flag status for an entry
  const toggleFlag = async (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;

    setIsUpdating(true);

    try {
      // Update the database based on entry type
      const result =
        entry.type === "application"
          ? await toggleApplicationFlag(entryId)
          : await toggleNominationFlag(entryId);

      if (!result.success) {
        throw new Error(`Failed to toggle flag for ${entry.fullName}`);
      }

      // Update the UI state after successful database update
      setEntries(
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, flagged: !entry.flagged } : entry
        )
      );

      const action = result.flagged ? "flagged" : "unflagged";
      toast.success(`Entry ${action}`, {
        description: `${entry.fullName} was ${action} successfully`,
      });
    } catch (error) {
      console.error("Error toggling flag:", error);
      toast.error("Update failed", {
        description:
          "There was an error updating the flag status. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Generate activity data based on current entries
  const activityData = useMemo(() => {
    // Sort entries by submission date (newest first)
    const sortedEntries = [...entries].sort(
      (a, b) =>
        new Date(b.submissionDate).getTime() -
        new Date(a.submissionDate).getTime()
    );

    return sortedEntries.slice(0, 5).map((entry) => {
      const date = new Date(entry.submissionDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let activityText = "";
      let icon;
      let bgColor = "";
      let iconColor = "";

      switch (entry.status) {
        case "invited":
          activityText = `${entry.fullName} invited to audition`;
          icon = <Check className="h-4 w-4" />;
          bgColor = "bg-green-100 dark:bg-green-900/30";
          iconColor = "text-green-600 dark:text-green-400";
          break;
        case "shortlisted":
          activityText = `${entry.fullName} shortlisted`;
          icon = <Star className="h-4 w-4" />;
          bgColor = "bg-blue-100 dark:bg-blue-900/30";
          iconColor = "text-blue-600 dark:text-blue-400";
          break;
        case "rejected":
          activityText = `${entry.fullName} application rejected`;
          icon = <X className="h-4 w-4" />;
          bgColor = "bg-red-100 dark:bg-red-900/30";
          iconColor = "text-red-600 dark:text-red-400";
          break;
        case "flagged":
          activityText = `${entry.fullName} flagged for review`;
          icon = <Flag className="h-4 w-4" />;
          bgColor = "bg-orange-100 dark:bg-orange-900/30";
          iconColor = "text-orange-600 dark:text-orange-400";
          break;
        case "contacted":
          activityText = `${entry.fullName} contacted for more info`;
          icon = <PhoneCall className="h-4 w-4" />;
          bgColor = "bg-purple-100 dark:bg-purple-900/30";
          iconColor = "text-purple-600 dark:text-purple-400";
          break;
        default:
          activityText = `New ${entry.type} from ${entry.fullName}`;
          icon = <Clock className="h-4 w-4" />;
          bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
          iconColor = "text-yellow-600 dark:text-yellow-400";
      }

      let timeText;
      if (diffDays === 0) {
        timeText = "Today";
      } else if (diffDays === 1) {
        timeText = "Yesterday";
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

  // Export data to CSV
  const downloadCSV = (data: SpeakerEntry[], filename: string) => {
    // Define header based on entry type
    const applicationHeaders = [
      "ID",
      "Full Name",
      "Topic",
      "Gender",
      "Job",
      "Mobile Phone",
      "WeChat ID",
      "Prior TED Talk",
      "Status",
      "Flagged",
      "Rating",
      "Notes",
      "Submission Date",
    ];

    const nominationHeaders = [
      "ID",
      "Full Name",
      "Topic",
      "Nominated By",
      "Contact",
      "Prior TED Talk",
      "Status",
      "Flagged",
      "Rating",
      "Notes",
      "Submission Date",
    ];

    // Start with the BOM to handle Unicode characters in Excel
    let csvContent = "\uFEFF";

    // Separate by entry type and export appropriate data
    if (activeTab === "all" || activeTab === "applications") {
      // Applications export
      const applicationsData = data.filter(
        (entry) => entry.type === "application"
      );

      if (applicationsData.length > 0) {
        csvContent += applicationHeaders.join(",") + "\n";

        applicationsData.forEach((entry) => {
          const appEntry = entry as ApplicationEntry;
          const row = [
            `"${appEntry.id}"`,
            `"${appEntry.fullName.replace(/"/g, '""')}"`,
            `"${appEntry.topic.replace(/"/g, '""')}"`,
            `"${appEntry.gender}"`,
            `"${appEntry.job.replace(/"/g, '""')}"`,
            `"${appEntry.mobilePhone}"`,
            `"${appEntry.wechatId}"`,
            `"${appEntry.priorTedTalk ? appEntry.priorTedTalk.replace(/"/g, '""') : ""}"`,
            `"${appEntry.status.replace(/_/g, " ")}"`,
            `"${appEntry.flagged ? "Yes" : "No"}"`,
            `"${appEntry.rating}"`,
            `"${appEntry.notes ? appEntry.notes.replace(/"/g, '""') : ""}"`,
            `"${new Date(appEntry.submissionDate).toLocaleDateString()}"`,
          ].join(",");
          csvContent += row + "\n";
        });

        // If only applications tab, download now
        if (activeTab === "applications") {
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", `${filename}_applications.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      }
    }

    if (activeTab === "all" || activeTab === "nominations") {
      // Nominations export
      const nominationsData = data.filter(
        (entry) => entry.type === "nomination"
      );

      if (nominationsData.length > 0) {
        // If doing both, add a separation
        if (activeTab === "all" && csvContent.length > 1) {
          csvContent += "\n\nNOMINATIONS\n";
        }

        csvContent += nominationHeaders.join(",") + "\n";

        nominationsData.forEach((entry) => {
          const nomEntry = entry as NominationEntry;
          const row = [
            `"${nomEntry.id}"`,
            `"${nomEntry.fullName.replace(/"/g, '""')}"`,
            `"${nomEntry.topic.replace(/"/g, '""')}"`,
            `"${nomEntry.nominatedBy.replace(/"/g, '""')}"`,
            `"${nomEntry.contact.replace(/"/g, '""')}"`,
            `"${nomEntry.priorTedTalk ? nomEntry.priorTedTalk.replace(/"/g, '""') : ""}"`,
            `"${nomEntry.status.replace(/_/g, " ")}"`,
            `"${nomEntry.flagged ? "Yes" : "No"}"`,
            `"${nomEntry.rating}"`,
            `"${nomEntry.notes ? nomEntry.notes.replace(/"/g, '""') : ""}"`,
            `"${new Date(nomEntry.submissionDate).toLocaleDateString()}"`,
          ].join(",");
          csvContent += row + "\n";
        });
      }
    }

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rest of the component remains the same...

  return (
    // The rest of your component's JSX remains the same...
    <div className="container mx-auto py-24 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Speaker Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage speaker applications and nominations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* User dropdown with logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-dashed"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-xs">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline-block">
                  {user.name || user.email}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled
                className="flex justify-between text-muted-foreground"
              >
                <span>Role</span>
                <span className="font-medium">Admin</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="flex justify-between text-muted-foreground"
              >
                <span>Email</span>
                <span className="max-w-[180px] truncate font-medium">
                  {user.email}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-50 focus:bg-red-600"
                onClick={async () => {
                  await signOut();
                  router.push("/sign-in");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => downloadCSV(entries, "speaker_entries")}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Total Nominations
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Invited to Speak
            </CardTitle>
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
            {/* Add Create Entry Button (moved beside Columns) */}
            <Button
              variant="outline"
              onClick={() => {
                setSelectedEntry(null);
                setEditMode(true);
                setEntryFormOpen(true);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Entry
            </Button>

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
                  .filter(
                    (column) => column.id !== "drag" && column.id !== "select"
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={
                          column.id
                            ? columnVisibility[column.id] !== false
                            : false
                        }
                        onCheckedChange={(checked) => {
                          if (column.id) {
                            setColumnVisibility((prev) => ({
                              ...prev,
                              [column.id as string]: checked,
                            }));
                          }
                        }}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
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
                  <div className="flex flex-wrap gap-1 mt-1">
                    {/* Add an "All" option */}
                    <Badge
                      key="all"
                      variant={
                        statusFilter.includes("all") ? "default" : "outline"
                      }
                      className={`cursor-pointer ${
                        statusFilter.includes("all")
                          ? "bg-primary/90 hover:bg-primary/70"
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => {
                        // If "all" is clicked, only select "all"
                        setStatusFilter(["all"]);
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        All Statuses
                      </div>
                    </Badge>

                    {statusOptions.map((option) => (
                      <Badge
                        key={option.value}
                        variant={
                          statusFilter.includes(option.value)
                            ? "default"
                            : "outline"
                        }
                        className={`cursor-pointer ${
                          statusFilter.includes(option.value)
                            ? "bg-primary/90 hover:bg-primary/70"
                            : "hover:bg-primary/10"
                        }`}
                        onClick={() => {
                          if (statusFilter.includes(option.value)) {
                            // Remove this status if it's already selected
                            const newFilters = statusFilter.filter(
                              (s) => s !== option.value
                            );
                            // If removing the last specific status, revert to "all"
                            setStatusFilter(
                              newFilters.length === 0 ? ["all"] : newFilters
                            );
                          } else {
                            // Add this status and remove "all" if it's present
                            const newFilters = [
                              ...statusFilter.filter((s) => s !== "all"),
                              option.value,
                            ];
                            setStatusFilter(newFilters);
                          }
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              option.value === "under_review"
                                ? "bg-yellow-400"
                                : option.value === "shortlisted"
                                  ? "bg-blue-400"
                                  : option.value === "invited"
                                    ? "bg-green-500"
                                    : option.value === "rejected"
                                      ? "bg-red-500"
                                      : option.value === "contacted"
                                        ? "bg-purple-400"
                                        : option.value === "flagged"
                                          ? "bg-orange-400"
                                          : "bg-gray-400"
                            }`}
                          ></div>
                          {option.label}
                        </div>
                      </Badge>
                    ))}

                    {statusFilter.length > 0 &&
                      !(
                        statusFilter.length === 1 && statusFilter[0] === "all"
                      ) && (
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-destructive/10 border-dashed"
                          onClick={() => setStatusFilter(["all"])}
                        >
                          Clear
                        </Badge>
                      )}
                  </div>
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
                      setStatusFilter(["all"]);
                      setTypeFilter("all");
                      setSearchQuery("");
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
                onTableChange={setAllEntriesTable}
              />
            </CardContent>
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {allEntriesTable
                    ? `${allEntriesTable.getState().pagination.pageIndex * allEntriesTable.getState().pagination.pageSize + 1}-${Math.min((allEntriesTable.getState().pagination.pageIndex + 1) * allEntriesTable.getState().pagination.pageSize, filteredEntries.length)} of ${filteredEntries.length} entries`
                    : `${filteredEntries.length} entries`}
                </p>
                {allEntriesTable && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Rows per page</span>
                    <Select
                      value={`${allEntriesTable.getState().pagination.pageSize}`}
                      onValueChange={(value) => {
                        allEntriesTable.setPageSize(Number(value));
                        triggerUpdate();
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {allEntriesTable && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    Page {allEntriesTable.getState().pagination.pageIndex + 1}{" "}
                    of {allEntriesTable.getPageCount()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        allEntriesTable.setPageIndex(0);
                        triggerUpdate();
                      }}
                      disabled={!allEntriesTable.getCanPreviousPage()}
                    >
                      {"<<"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        allEntriesTable.previousPage();
                        triggerUpdate();
                      }}
                      disabled={!allEntriesTable.getCanPreviousPage()}
                    >
                      {"<"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        allEntriesTable.nextPage();
                        triggerUpdate();
                      }}
                      disabled={!allEntriesTable.getCanNextPage()}
                    >
                      {">"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        allEntriesTable.setPageIndex(
                          allEntriesTable.getPageCount() - 1
                        );
                        triggerUpdate();
                      }}
                      disabled={!allEntriesTable.getCanNextPage()}
                    >
                      {">>"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                data={filteredEntries.filter((e) => e.type === "application")}
                onRowClick={openDetails}
                updateStatus={updateStatus}
                updateRating={updateRating}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
                onTableChange={setApplicationsTable}
              />
            </CardContent>
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {applicationsTable
                    ? `${applicationsTable.getState().pagination.pageIndex * applicationsTable.getState().pagination.pageSize + 1}-${Math.min((applicationsTable.getState().pagination.pageIndex + 1) * applicationsTable.getState().pagination.pageSize, filteredEntries.filter((e) => e.type === "application").length)} of ${filteredEntries.filter((e) => e.type === "application").length} applications`
                    : `${filteredEntries.filter((e) => e.type === "application").length} applications`}
                </p>
                {applicationsTable && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Rows per page</span>
                    <Select
                      value={`${applicationsTable.getState().pagination.pageSize}`}
                      onValueChange={(value) => {
                        applicationsTable.setPageSize(Number(value));
                        triggerUpdate();
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {applicationsTable && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    Page {applicationsTable.getState().pagination.pageIndex + 1}{" "}
                    of {applicationsTable.getPageCount()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        applicationsTable.setPageIndex(0);
                        triggerUpdate();
                      }}
                      disabled={!applicationsTable.getCanPreviousPage()}
                    >
                      {"<<"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        applicationsTable.previousPage();
                        triggerUpdate();
                      }}
                      disabled={!applicationsTable.getCanPreviousPage()}
                    >
                      {"<"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        applicationsTable.nextPage();
                        triggerUpdate();
                      }}
                      disabled={!applicationsTable.getCanNextPage()}
                    >
                      {">"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        applicationsTable.setPageIndex(
                          applicationsTable.getPageCount() - 1
                        );
                        triggerUpdate();
                      }}
                      disabled={!applicationsTable.getCanNextPage()}
                    >
                      {">>"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="nominations">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                data={filteredEntries.filter((e) => e.type === "nomination")}
                onRowClick={openDetails}
                updateStatus={updateStatus}
                updateRating={updateRating}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
                onTableChange={setNominationsTable}
              />
            </CardContent>
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {nominationsTable
                    ? `${nominationsTable.getState().pagination.pageIndex * nominationsTable.getState().pagination.pageSize + 1}-${Math.min((nominationsTable.getState().pagination.pageIndex + 1) * nominationsTable.getState().pagination.pageSize, filteredEntries.filter((e) => e.type === "nomination").length)} of ${filteredEntries.filter((e) => e.type === "nomination").length} nominations`
                    : `${filteredEntries.filter((e) => e.type === "nomination").length} nominations`}
                </p>
                {nominationsTable && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Rows per page</span>
                    <Select
                      value={`${nominationsTable.getState().pagination.pageSize}`}
                      onValueChange={(value) => {
                        nominationsTable.setPageSize(Number(value));
                        triggerUpdate();
                      }}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {nominationsTable && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    Page {nominationsTable.getState().pagination.pageIndex + 1}{" "}
                    of {nominationsTable.getPageCount()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        nominationsTable.setPageIndex(0);
                        triggerUpdate();
                      }}
                      disabled={!nominationsTable.getCanPreviousPage()}
                    >
                      {"<<"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        nominationsTable.previousPage();
                        triggerUpdate();
                      }}
                      disabled={!nominationsTable.getCanPreviousPage()}
                    >
                      {"<"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        nominationsTable.nextPage();
                        triggerUpdate();
                      }}
                      disabled={!nominationsTable.getCanNextPage()}
                    >
                      {">"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        nominationsTable.setPageIndex(
                          nominationsTable.getPageCount() - 1
                        );
                        triggerUpdate();
                      }}
                      disabled={!nominationsTable.getCanNextPage()}
                    >
                      {">>"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
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
            <CardDescription>
              Current state of applications and nominations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Under Review",
                        value: entries.filter(
                          (e) => e.status === "under_review"
                        ).length,
                        color: "#EAB308",
                      },
                      {
                        name: "Shortlisted",
                        value: entries.filter((e) => e.status === "shortlisted")
                          .length,
                        color: "#3B82F6",
                      },
                      {
                        name: "Invited",
                        value: entries.filter((e) => e.status === "invited")
                          .length,
                        color: "#22C55E",
                      },
                      {
                        name: "Rejected",
                        value: entries.filter((e) => e.status === "rejected")
                          .length,
                        color: "#EF4444",
                      },
                      {
                        name: "Contacted",
                        value: entries.filter((e) => e.status === "contacted")
                          .length,
                        color: "#8B5CF6",
                      },
                      {
                        name: "Flagged",
                        value: entries.filter((e) => e.status === "flagged")
                          .length,
                        color: "#F97316",
                      },
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
                      .map((entry) => entry.status)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((status, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            status === "under_review"
                              ? "#EAB308"
                              : status === "shortlisted"
                                ? "#3B82F6"
                                : status === "invited"
                                  ? "#22C55E"
                                  : status === "rejected"
                                    ? "#EF4444"
                                    : status === "contacted"
                                      ? "#8B5CF6"
                                      : status === "flagged"
                                        ? "#F97316"
                                        : "#94A3B8"
                          }
                        />
                      ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} entries`, "Count"]}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-xs">{value}</span>
                    )}
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
                activities.map((activity) => {
                  // Find the corresponding entry
                  const entry = entries.find((e) => e.id === activity.entryId);
                  if (!entry) return null;

                  // Generate visual elements based on status
                  let icon;
                  let bgColor = "";
                  let iconColor = "";

                  switch (activity.status) {
                    case "invited":
                      icon = <Check className="h-4 w-4" />;
                      bgColor = "bg-green-100 dark:bg-green-900/30";
                      iconColor = "text-green-600 dark:text-green-400";
                      break;
                    case "shortlisted":
                      icon = <Star className="h-4 w-4" />;
                      bgColor = "bg-blue-100 dark:bg-blue-900/30";
                      iconColor = "text-blue-600 dark:text-blue-400";
                      break;
                    case "rejected":
                      icon = <X className="h-4 w-4" />;
                      bgColor = "bg-red-100 dark:bg-red-900/30";
                      iconColor = "text-red-600 dark:text-red-400";
                      break;
                    case "flagged":
                      icon = <Flag className="h-4 w-4" />;
                      bgColor = "bg-orange-100 dark:bg-orange-900/30";
                      iconColor = "text-orange-600 dark:text-orange-400";
                      break;
                    case "contacted":
                      icon = <PhoneCall className="h-4 w-4" />;
                      bgColor = "bg-purple-100 dark:bg-purple-900/30";
                      iconColor = "text-purple-600 dark:text-purple-400";
                      break;
                    default:
                      icon = <Clock className="h-4 w-4" />;
                      bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
                      iconColor = "text-yellow-600 dark:text-yellow-400";
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
                    timeText = "Just now";
                  } else if (diffMins < 60) {
                    timeText = `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
                  } else if (diffHours < 24) {
                    timeText = `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
                  } else if (diffDays === 1) {
                    timeText = "Yesterday";
                  } else {
                    timeText = timestamp.toLocaleDateString();
                  }

                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 group cursor-default animate-fadeIn"
                    >
                      <div
                        className={`rounded-full p-2 ${bgColor} transition-transform group-hover:scale-110`}
                      >
                        <div className={iconColor}>{icon}</div>
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {timeText}
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              activity.type === "application"
                                ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                                : "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                            }
                          >
                            {activity.type === "application"
                              ? "Application"
                              : "Nomination"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : activityData.length > 0 ? (
                // Show initial activity data if there are no status change activities yet
                activityData.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 group cursor-default"
                  >
                    <div
                      className={`rounded-full p-2 ${activity.bgColor} transition-transform group-hover:scale-110`}
                    >
                      <div className={activity.iconColor}>{activity.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {activity.timeText}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            activity.type === "application"
                              ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                              : "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                          }
                        >
                          {activity.type === "application"
                            ? "Application"
                            : "Nomination"}
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
                      {selectedEntry.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedEntry.fullName}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedEntry.type === "application"
                        ? `${(selectedEntry as ApplicationEntry).job} • ${(selectedEntry as ApplicationEntry).gender}`
                        : `Nominated by ${(selectedEntry as NominationEntry).nominatedBy}`}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Entry Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Topic
                      </p>
                      <p>{selectedEntry.topic}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Prior TED/TEDx Experience
                      </p>
                      <p>{selectedEntry.priorTedTalk}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Submission Date
                      </p>
                      <p>
                        {new Date(
                          selectedEntry.submissionDate
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {selectedEntry.type === "application" && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Contact Information
                          </p>
                          <p>
                            Email: {(selectedEntry as ApplicationEntry).email}
                          </p>
                          <p>
                            Mobile:{" "}
                            {(selectedEntry as ApplicationEntry).mobilePhone}
                          </p>
                          <p>
                            WeChat:{" "}
                            {(selectedEntry as ApplicationEntry).wechatId}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Rehearsal Availability (Sep-Nov)
                          </p>
                          <p>
                            {
                              (selectedEntry as ApplicationEntry)
                                .rehearsalAvailability
                            }
                          </p>
                        </div>
                      </>
                    )}

                    {selectedEntry.type === "nomination" && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Contact Information
                          </p>
                          <p>{(selectedEntry as NominationEntry).contact}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Structured Idea Framework - Only for applications */}
                {selectedEntry.type === "application" && (
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="font-medium text-lg mb-2">
                      Structured Idea Framework
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          1. Common Belief/Behavior to Challenge
                        </p>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">
                          {(selectedEntry as ApplicationEntry).commonBelief ||
                            "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          2. Core Idea
                        </p>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">
                          {(selectedEntry as ApplicationEntry).coreIdea ||
                            "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          3. Personal Insight/Example
                        </p>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">
                          {(selectedEntry as ApplicationEntry)
                            .personalInsight || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          4. Potential Impact
                        </p>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">
                          {(selectedEntry as ApplicationEntry)
                            .potentialImpact || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-lg mb-2">Review & Status</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Current Status
                      </p>
                      <Select
                        value={selectedEntry.status}
                        onValueChange={(value) =>
                          updateStatus(selectedEntry.id, value)
                        }
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-full mt-1 h-10">
                          <SelectValue>
                            <StatusBadge status={selectedEntry.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    option.value === "under_review"
                                      ? "bg-yellow-400"
                                      : option.value === "shortlisted"
                                        ? "bg-blue-400"
                                        : option.value === "invited"
                                          ? "bg-green-500"
                                          : option.value === "rejected"
                                            ? "bg-red-500"
                                            : option.value === "contacted"
                                              ? "bg-purple-400"
                                              : option.value === "flagged"
                                                ? "bg-orange-400"
                                                : "bg-gray-400"
                                  }`}
                                ></div>
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Rating
                      </p>
                      <div className="mt-1">
                        <Rating
                          rating={selectedEntry.rating}
                          onChange={(newRating) =>
                            updateRating(selectedEntry.id, newRating)
                          }
                          disabled={isUpdating}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Notes
                      </p>
                      <Textarea
                        className="mt-1 w-full min-h-[100px]"
                        value={selectedEntry.notes || ""}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          // Update the notes in the selected entry state first for immediate feedback
                          setSelectedEntry({
                            ...selectedEntry,
                            notes: e.target.value,
                          });
                        }}
                        placeholder="Add your notes about this speaker..."
                        disabled={isUpdating}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateNotes(
                              selectedEntry.id,
                              selectedEntry.notes || ""
                            );
                          }}
                          disabled={isUpdating}
                        >
                          Save Notes
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            // Close details view
                            setDetailsOpen(false);
                            // Open edit form
                            openEditForm(selectedEntry);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Entry
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2 md:gap-0 mt-6">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
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
              Update status for {Object.keys(rowSelection).length} selected{" "}
              {Object.keys(rowSelection).length === 1 ? "entry" : "entries"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-status">New Status</Label>
              <Select
                onValueChange={(value) => setNewBulkStatus(value)}
                disabled={isUpdating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            option.value === "under_review"
                              ? "bg-yellow-400"
                              : option.value === "shortlisted"
                                ? "bg-blue-400"
                                : option.value === "invited"
                                  ? "bg-green-500"
                                  : option.value === "rejected"
                                    ? "bg-red-500"
                                    : option.value === "contacted"
                                      ? "bg-purple-400"
                                      : option.value === "flagged"
                                        ? "bg-orange-400"
                                        : "bg-gray-400"
                          }`}
                        ></div>
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
              variant="destructive"
              onClick={() => {
                setRowSelection({});
                setBulkActionOpen(false);
              }}
              disabled={isUpdating}
            >
              Clear Selection
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={async () => {
                if (!newBulkStatus) {
                  toast.error("Please select a status", {
                    description: "You must select a status before confirming.",
                  });
                  return;
                }

                setIsUpdating(true);
                try {
                  // Get the current visible data based on active tab
                  let dataToUse = filteredEntries;

                  if (activeTab === "applications") {
                    dataToUse = filteredEntries.filter(
                      (e) => e.type === "application"
                    );
                  } else if (activeTab === "nominations") {
                    dataToUse = filteredEntries.filter(
                      (e) => e.type === "nomination"
                    );
                  }

                  // Convert row indices to actual entry objects
                  const selectedEntryIds = Object.keys(rowSelection)
                    .map((index) => {
                      const idx = parseInt(index);
                      return idx >= 0 && idx < dataToUse.length
                        ? dataToUse[idx].id
                        : null;
                    })
                    .filter(Boolean) as string[];

                  // For each selected entry
                  for (const id of selectedEntryIds) {
                    const entry = entries.find((e) => e.id === id);
                    if (!entry) continue;

                    // Update in database
                    const result =
                      entry.type === "application"
                        ? await updateApplicationStatus(id, newBulkStatus)
                        : await updateNominationStatus(id, newBulkStatus);

                    if (!result.success) {
                      throw new Error(
                        `Failed to update status for entry ${id}`
                      );
                    }

                    // Add to activity log
                    addActivity(id, newBulkStatus);
                  }

                  // Update all entries in state
                  setEntries(
                    entries.map((entry) => {
                      if (selectedEntryIds.includes(entry.id)) {
                        return { ...entry, status: newBulkStatus };
                      }
                      return entry;
                    })
                  );

                  toast.success("Bulk update complete", {
                    description: `Updated ${selectedEntryIds.length} entries to ${newBulkStatus.replace("_", " ")}`,
                  });
                } catch (error) {
                  console.error("Error in bulk update:", error);
                  toast.error("Bulk update failed", {
                    description:
                      "There was an error updating some entries. Please try again.",
                  });
                } finally {
                  // Close dialog and clear selection
                  setBulkActionOpen(false);
                  setRowSelection({});
                  setNewBulkStatus("");
                  setIsUpdating(false);
                }
              }}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Confirm Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Entry Form Modal - For Creating and Editing Entries */}
      <Dialog open={entryFormOpen} onOpenChange={setEntryFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode
                ? selectedEntry
                  ? "Edit Entry"
                  : "Create New Entry"
                : "View Entry"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? selectedEntry
                  ? "Edit the details of this speaker entry"
                  : "Create a new speaker application or nomination"
                : "View speaker details"}
            </DialogDescription>
          </DialogHeader>

          {/* Entry Type Selector - Only show when creating a new entry */}
          {editMode && !selectedEntry && (
            <div className="mb-6">
              <Label className="block mb-2">Entry Type</Label>
              <div className="flex space-x-4">
                <div
                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition ${
                    entryType === "application"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setEntryType("application")}
                >
                  <div className="font-medium mb-1">Application</div>
                  <div className="text-sm text-muted-foreground">
                    Speaker applied directly through the website
                  </div>
                </div>
                <div
                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition ${
                    entryType === "nomination"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setEntryType("nomination")}
                >
                  <div className="font-medium mb-1">Nomination</div>
                  <div className="text-sm text-muted-foreground">
                    Speaker nominated by someone else
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Full name of the speaker"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  disabled={!editMode || isUpdating}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="topic">Talk Topic</Label>
                <Input
                  id="topic"
                  placeholder="Main topic or title of the talk"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  disabled={!editMode || isUpdating}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="priorTedTalk">Prior TED/TEDx Experience</Label>
                <Input
                  id="priorTedTalk"
                  placeholder="Any previous TED or TEDx talks"
                  value={formData.priorTedTalk}
                  onChange={(e) =>
                    setFormData({ ...formData, priorTedTalk: e.target.value })
                  }
                  disabled={!editMode || isUpdating}
                  className="mt-1"
                />
              </div>

              {/* Application specific fields */}
              {(entryType === "application" ||
                (selectedEntry && selectedEntry.type === "application")) && (
                <>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                      disabled={!editMode || isUpdating}
                    >
                      <SelectTrigger id="gender" className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="job">Job Title</Label>
                    <Input
                      id="job"
                      placeholder="Current position or job title"
                      value={formData.job}
                      onChange={(e) =>
                        setFormData({ ...formData, job: e.target.value })
                      }
                      disabled={!editMode || isUpdating}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              {/* Application specific fields */}
              {(entryType === "application" ||
                (selectedEntry && selectedEntry.type === "application")) && (
                <>
                  <div>
                    <Label htmlFor="mobilePhone">Mobile Phone</Label>
                    <Input
                      id="mobilePhone"
                      placeholder="Mobile phone number"
                      value={formData.mobilePhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobilePhone: e.target.value,
                        })
                      }
                      disabled={!editMode || isUpdating}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="wechatId">WeChat ID</Label>
                    <Input
                      id="wechatId"
                      placeholder="WeChat ID for contact"
                      value={formData.wechatId}
                      onChange={(e) =>
                        setFormData({ ...formData, wechatId: e.target.value })
                      }
                      disabled={!editMode || isUpdating}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* Nomination specific fields */}
              {(entryType === "nomination" ||
                (selectedEntry && selectedEntry.type === "nomination")) && (
                <>
                  <div>
                    <Label htmlFor="nominatedBy">Nominated By</Label>
                    <Input
                      id="nominatedBy"
                      placeholder="Name of the person who nominated"
                      value={formData.nominatedBy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nominatedBy: e.target.value,
                        })
                      }
                      disabled={!editMode || isUpdating}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input
                      id="contact"
                      placeholder="Contact information for the speaker"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      disabled={!editMode || isUpdating}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {/* Status field - shown for both types */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  disabled={!editMode || isUpdating}
                >
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setEntryFormOpen(false);
                // Reset form data
                if (!selectedEntry) {
                  setFormData({
                    fullName: "",
                    topic: "",
                    priorTedTalk: "",
                    status: "under_review",
                    mobilePhone: "",
                    wechatId: "",
                    gender: "Male",
                    job: "",
                    contact: "",
                    nominatedBy: "",
                  });
                }
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>

            {editMode ? (
              <Button
                onClick={async () => {
                  setIsUpdating(true);

                  try {
                    // Validate form data
                    if (!formData.fullName)
                      throw new Error("Full name is required");
                    if (!formData.topic) throw new Error("Topic is required");

                    // Special validation for specific types
                    if (
                      entryType === "application" ||
                      (selectedEntry && selectedEntry.type === "application")
                    ) {
                      if (!formData.mobilePhone)
                        throw new Error("Mobile phone is required");
                      if (!formData.job)
                        throw new Error("Job title is required");
                    }

                    if (
                      entryType === "nomination" ||
                      (selectedEntry && selectedEntry.type === "nomination")
                    ) {
                      if (!formData.nominatedBy)
                        throw new Error("Nominator name is required");
                      if (!formData.contact)
                        throw new Error("Contact information is required");
                    }

                    let result;

                    // If we're editing an existing entry
                    if (selectedEntry) {
                      if (selectedEntry.type === "application") {
                        result = await updateApplicationDetails(
                          selectedEntry.id,
                          {
                            fullName: formData.fullName,
                            topic: formData.topic,
                            mobilePhone: formData.mobilePhone,
                            wechatId: formData.wechatId,
                            gender: formData.gender,
                            job: formData.job,
                            priorTedTalk: formData.priorTedTalk,
                          }
                        );

                        // Update status if it changed
                        if (selectedEntry.status !== formData.status) {
                          await updateApplicationStatus(
                            selectedEntry.id,
                            formData.status
                          );
                        }
                      } else {
                        result = await updateNominationDetails(
                          selectedEntry.id,
                          {
                            fullName: formData.fullName,
                            topic: formData.topic,
                            contact: formData.contact,
                            nominatedBy: formData.nominatedBy,
                            priorTedTalk: formData.priorTedTalk,
                          }
                        );

                        // Update status if it changed
                        if (selectedEntry.status !== formData.status) {
                          await updateNominationStatus(
                            selectedEntry.id,
                            formData.status
                          );
                        }
                      }

                      if (!result.success) {
                        throw new Error(
                          `Failed to update ${selectedEntry.type}`
                        );
                      }

                      // Update the entry in state
                      setEntries(
                        entries.map((entry) => {
                          if (entry.id === selectedEntry.id) {
                            if (entry.type === "application") {
                              const updatedEntry = {
                                ...entry,
                                fullName: formData.fullName,
                                topic: formData.topic,
                                mobilePhone: formData.mobilePhone,
                                wechatId: formData.wechatId,
                                gender: formData.gender,
                                job: formData.job,
                                priorTedTalk: formData.priorTedTalk,
                                status: formData.status,
                              };
                              return updatedEntry;
                            } else {
                              const updatedEntry = {
                                ...entry,
                                fullName: formData.fullName,
                                topic: formData.topic,
                                contact: formData.contact,
                                nominatedBy: formData.nominatedBy,
                                priorTedTalk: formData.priorTedTalk,
                                status: formData.status,
                              };
                              return updatedEntry;
                            }
                          }
                          return entry;
                        })
                      );

                      toast.success("Entry updated", {
                        description: `${formData.fullName}'s information was updated successfully`,
                      });
                    }
                    // Creating a new entry
                    else {
                      if (entryType === "application") {
                        result = await createDashboardApplication({
                          fullName: formData.fullName,
                          topic: formData.topic,
                          mobilePhone: formData.mobilePhone,
                          wechatId: formData.wechatId,
                          gender: formData.gender,
                          job: formData.job,
                          priorTedTalk: formData.priorTedTalk,
                          status: formData.status,
                        });
                      } else {
                        result = await createDashboardNomination({
                          fullName: formData.fullName,
                          topic: formData.topic,
                          contact: formData.contact,
                          nominatedBy: formData.nominatedBy,
                          priorTedTalk: formData.priorTedTalk,
                          status: formData.status,
                        });
                      }

                      if (!result.success) {
                        throw new Error(`Failed to create ${entryType}`);
                      }

                      // Add the new entry to state
                      if (result.success && result.data) {
                        // Need to properly type the new entry based on entry type
                        let newEntry: SpeakerEntry;

                        if (entryType === "application") {
                          newEntry = {
                            ...result.data,
                            type: "application",
                            submissionDate:
                              result.data.submissionDate.toISOString(),
                          } as ApplicationEntry;
                        } else {
                          newEntry = {
                            ...result.data,
                            type: "nomination",
                            submissionDate:
                              result.data.submissionDate.toISOString(),
                          } as NominationEntry;
                        }

                        setEntries([newEntry, ...entries]);

                        toast.success("Entry created", {
                          description: `New ${entryType} for ${formData.fullName} created successfully`,
                        });
                      }
                    }

                    // Close the modal
                    setEntryFormOpen(false);

                    // Reset form data
                    setFormData({
                      fullName: "",
                      topic: "",
                      priorTedTalk: "",
                      status: "under_review",
                      mobilePhone: "",
                      wechatId: "",
                      gender: "Male",
                      job: "",
                      contact: "",
                      nominatedBy: "",
                    });
                  } catch (error) {
                    console.error("Error creating/updating entry:", error);
                    toast.error("Operation failed", {
                      description:
                        error instanceof Error
                          ? error.message
                          : "An unexpected error occurred",
                    });
                  } finally {
                    setIsUpdating(false);
                  }
                }}
                disabled={isUpdating}
              >
                {isUpdating
                  ? "Saving..."
                  : selectedEntry
                    ? "Save Changes"
                    : "Create Entry"}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // Switch to edit mode
                  setEditMode(true);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Entry
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
