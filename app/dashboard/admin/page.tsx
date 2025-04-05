"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

// This would typically come from an API or database
const complaints = [
  {
    id: 1,
    title: "Poor WiFi Coverage in Dormitory B",
    description: "The WiFi signal is extremely weak on the 3rd floor of Dormitory B. This has been an issue for weeks and makes it difficult to attend online classes.",
    date: "2025-04-01",
    upvotes: 45,
    solved: false,
    submittedBy: "Anonymous (ID: 10045)",
  },
  {
    id: 2,
    title: "Cafeteria Food Quality",
    description: "The quality of food in the main cafeteria has significantly declined. Many items are served cold and the vegetarian options are very limited.",
    date: "2025-03-28",
    upvotes: 78,
    solved: false,
    submittedBy: "Anonymous (ID: 20089)",
  },
  {
    id: 3,
    title: "Broken Equipment in Chemistry Lab",
    description: "Several microscopes in the Chemistry lab (Room 305) are not functioning properly. This is affecting our ability to complete lab assignments.",
    date: "2025-03-25",
    upvotes: 23,
    solved: true,
    submittedBy: "Anonymous (ID: 30012)",
  },
  {
    id: 4,
    title: "Library Hours Too Limited",
    description: "The library closes at 7 PM on weekdays, which is too early for students who have evening classes. Please consider extending hours until at least 9 PM.",
    date: "2025-03-22",
    upvotes: 92,
    solved: false,
    submittedBy: "Anonymous (ID: 40056)",
  },
  {
    id: 5,
    title: "Parking Lot Lighting Issues",
    description: "The lighting in Parking Lot C is insufficient, making it unsafe for students leaving campus in the evening. Several lights appear to be burned out.",
    date: "2025-03-20",
    upvotes: 34,
    solved: true,
    submittedBy: "Anonymous (ID: 50078)",
  },
];

// User statistics
const userStats = {
  totalUsers: 2845,
  activeUsers: 1956,
  newUsersToday: 15,
  studentUsers: 2543,
  facultyUsers: 182,
  adminUsers: 120
};

// Content statistics
const contentStats = {
  totalAnnouncements: 127,
  activeEvents: 34,
  lostFoundItems: 56,
  openProjects: 23,
  totalComplaints: 89,
  solvedComplaints: 42
};

export default function AdminDashboardPage() {
  const [filteredComplaints, setFilteredComplaints] = useState(complaints);
  const [showSolved, setShowSolved] = useState(false);
  
  // Handle toggling the showSolved state
  const handleShowSolvedChange = () => {
    setShowSolved(!showSolved);
    
    if (!showSolved) {
      // Show all complaints
      setFilteredComplaints(complaints);
    } else {
      // Show only unsolved complaints
      setFilteredComplaints(complaints.filter(complaint => !complaint.solved));
    }
  };
  
  // Handle marking a complaint as solved/unsolved
  const handleToggleSolved = (id: number) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        return { ...complaint, solved: !complaint.solved };
      }
      return complaint;
    });
    
    // Update the complaints array
    complaints.length = 0;
    complaints.push(...updatedComplaints);
    
    // Update filtered complaints based on current filter
    if (!showSolved) {
      setFilteredComplaints(updatedComplaints);
    } else {
      setFilteredComplaints(updatedComplaints.filter(complaint => !complaint.solved));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <DashboardShell>
        <DashboardHeader 
          heading="Admin Dashboard" 
          text="Manage website content, users, and view site statistics."
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* User Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Overview of user registrations and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{userStats.totalUsers}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{userStats.activeUsers}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">New Today</p>
                  <p className="text-2xl font-bold">{userStats.newUsersToday}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Student Users</p>
                  <p className="text-2xl font-bold">{userStats.studentUsers}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Faculty Users</p>
                  <p className="text-2xl font-bold">{userStats.facultyUsers}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Admin Users</p>
                  <p className="text-2xl font-bold">{userStats.adminUsers}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/admin/users">
                <Button variant="outline">Manage Users</Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Content Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Content Statistics</CardTitle>
              <CardDescription>Overview of site content and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Announcements</p>
                  <p className="text-2xl font-bold">{contentStats.totalAnnouncements}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Events</p>
                  <p className="text-2xl font-bold">{contentStats.activeEvents}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Lost & Found Items</p>
                  <p className="text-2xl font-bold">{contentStats.lostFoundItems}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Open Projects</p>
                  <p className="text-2xl font-bold">{contentStats.openProjects}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Complaints</p>
                  <p className="text-2xl font-bold">{contentStats.totalComplaints}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Solved Complaints</p>
                  <p className="text-2xl font-bold">{contentStats.solvedComplaints}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-4">
                <Link href="/dashboard/admin/announcements">
                  <Button variant="outline">Manage Announcements</Button>
                </Link>
                <Link href="/dashboard/admin/events">
                  <Button variant="outline">Manage Events</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Complaints Management Section */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Student Complaints</CardTitle>
                <CardDescription>Review and manage student complaints</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-solved"
                  checked={showSolved}
                  onCheckedChange={handleShowSolvedChange}
                />
                <Label htmlFor="show-solved">Show Solved Complaints</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.length > 0 ? (
                filteredComplaints
                  .sort((a, b) => b.upvotes - a.upvotes) // Sort by upvotes (highest first)
                  .map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-medium">{complaint.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Submitted on {new Date(complaint.date).toLocaleDateString()} by {complaint.submittedBy}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={complaint.solved ? "outline" : "default"}>
                            {complaint.solved ? "Solved" : "Unsolved"}
                          </Badge>
                          <Badge variant="secondary">{complaint.upvotes} Upvotes</Badge>
                        </div>
                      </div>
                      <p className="mb-3">{complaint.description}</p>
                      <div className="flex justify-end">
                        <Button 
                          variant={complaint.solved ? "outline" : "default"} 
                          size="sm"
                          onClick={() => handleToggleSolved(complaint.id)}
                        >
                          {complaint.solved ? "Mark as Unsolved" : "Mark as Solved"}
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No complaints found</h3>
                  <p className="text-muted-foreground">
                    {showSolved
                      ? "There are no student complaints to display."
                      : "There are no unsolved student complaints."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/announcements/create">
              <Button className="w-full" variant="outline">
                Create Announcement
              </Button>
            </Link>
            <Link href="/events/create">
              <Button className="w-full" variant="outline">
                Create Event
              </Button>
            </Link>
            <Link href="/dashboard/admin/settings">
              <Button className="w-full" variant="outline">
                Site Settings
              </Button>
            </Link>
            <Link href="/dashboard/admin/reports">
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
            </Link>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
} 