"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

// This would typically come from an API or database
const studentData = {
  name: "Alex Johnson",
  id: "ST12345",
  department: "Computer Science",
  year: "Junior",
  enrolledCourses: [
    {
      code: "CS301",
      title: "Data Structures and Algorithms",
      instructor: "Dr. Emily Chen",
      schedule: "Mon/Wed 10:00 AM - 11:30 AM",
      location: "Science Building, Room 205"
    },
    {
      code: "CS355",
      title: "Database Systems",
      instructor: "Prof. Michael Wilson",
      schedule: "Tue/Thu 1:00 PM - 2:30 PM",
      location: "Engineering Building, Room 110"
    },
    {
      code: "MATH240",
      title: "Linear Algebra",
      instructor: "Dr. Sarah Thompson",
      schedule: "Mon/Wed/Fri 9:00 AM - 10:00 AM",
      location: "Math Building, Room 305"
    },
    {
      code: "ENG220",
      title: "Technical Writing",
      instructor: "Prof. Robert Davis",
      schedule: "Tue/Thu 3:00 PM - 4:30 PM",
      location: "Humanities Building, Room 210"
    }
  ],
  upcomingAssignments: [
    {
      id: 1,
      course: "CS301",
      title: "Algorithm Analysis Project",
      dueDate: "2025-04-15",
      status: "pending"
    },
    {
      id: 2,
      course: "CS355",
      title: "Database Design Assignment",
      dueDate: "2025-04-10",
      status: "pending"
    },
    {
      id: 3,
      course: "MATH240",
      title: "Matrix Operations Problem Set",
      dueDate: "2025-04-08",
      status: "submitted"
    },
    {
      id: 4,
      course: "ENG220",
      title: "Technical Documentation Project",
      dueDate: "2025-04-20",
      status: "pending"
    }
  ],
  appliedProjects: [
    {
      id: 1,
      title: "Campus Mobile App Development",
      department: "Computer Science",
      supervisor: "Dr. Emily Chen",
      status: "Applied",
      appliedDate: "2025-03-25"
    },
    {
      id: 2,
      title: "Student Services Database Optimization",
      department: "Information Technology",
      supervisor: "Prof. Michael Wilson",
      status: "Accepted",
      appliedDate: "2025-03-15"
    }
  ],
  recentAnnouncements: [
    {
      id: 1,
      title: "Spring Break Schedule Change",
      category: "Academic",
      date: "2025-04-02",
      preview: "The spring break has been extended by two days due to the upcoming national conference..."
    },
    {
      id: 2,
      title: "CS Department Guest Lecture",
      category: "Department",
      date: "2025-04-01",
      preview: "Join us for a guest lecture by Dr. Alan Turing on the future of artificial intelligence..."
    },
    {
      id: 3,
      title: "Course Registration Deadline",
      category: "Administrative",
      date: "2025-03-30",
      preview: "Reminder: The deadline for fall semester course registration is April 15th. Make sure to..."
    }
  ]
};

export default function StudentDashboardPage() {
  const [complaintText, setComplaintText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  // Handle complaint submission
  const handleSubmitComplaint = () => {
    if (!complaintText.trim()) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setComplaintText("");
      // Show success notification or feedback here
      alert("Complaint submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <DashboardShell>
        <DashboardHeader 
          heading={`Welcome, ${studentData.name}`}
          text={`Student ID: ${studentData.id} | Department: ${studentData.department} | Year: ${studentData.year}`}
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Classes Card */}
          <Card>
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
              <CardDescription>Your currently enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.enrolledCourses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{course.code}: {course.title}</h3>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>{course.schedule}</p>
                      <p>{course.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/student/courses">
                <Button variant="outline">View Course Details</Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Assignments Card */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.upcomingAssignments
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">Course: {assignment.course}</p>
                        </div>
                        <Badge variant={assignment.status === "submitted" ? "outline" : "default"}>
                          {assignment.status === "submitted" ? "Submitted" : "Pending"}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/student/assignments">
                <Button variant="outline">View All Assignments</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* Project Applications */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Project Applications</CardTitle>
            <CardDescription>Your applied projects and applications status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.appliedProjects.length > 0 ? (
                studentData.appliedProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Department: {project.department} | Supervisor: {project.supervisor}
                        </p>
                      </div>
                      <Badge variant={project.status === "Accepted" ? "success" : "default"}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Applied on: {new Date(project.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p>You haven't applied to any projects yet.</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-4">
              <Link href="/projects">
                <Button variant="outline">Browse Projects</Button>
              </Link>
              <Link href="/dashboard/student/my-projects">
                <Button variant="outline">My Projects</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        {/* Recent Announcements */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest campus announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Posted on: {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge>{announcement.category}</Badge>
                  </div>
                  <p className="mt-2">{announcement.preview}</p>
                  <div className="mt-2">
                    <Link href={`/announcements/${announcement.id}`}>
                      <Button variant="link" className="p-0">Read More</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/announcements">
              <Button variant="outline">View All Announcements</Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Anonymous Complaint System */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Submit Anonymous Complaint</CardTitle>
            <CardDescription>
              Your feedback helps improve campus services. While submissions are anonymous, administrators will know your identity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Textarea 
                  placeholder="Describe your complaint or concern in detail..." 
                  className="min-h-32"
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Although complaints appear anonymous to other students, administrators can see who submitted them for accountability purposes.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitComplaint} 
                  disabled={!complaintText.trim() || submitting}
                >
                  {submitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Links */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/schedules">
              <Button className="w-full" variant="outline">
                View Schedules
              </Button>
            </Link>
            <Link href="/lost-found">
              <Button className="w-full" variant="outline">
                Lost & Found
              </Button>
            </Link>
            <Link href="/events">
              <Button className="w-full" variant="outline">
                Campus Events
              </Button>
            </Link>
            <Link href="/forums">
              <Button className="w-full" variant="outline">
                College Forums
              </Button>
            </Link>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
} 