"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

// This would typically come from an API or database
const facultyData = {
  name: "Dr. Emily Chen",
  id: "FAC10045",
  department: "Computer Science",
  position: "Associate Professor",
  courses: [
    {
      code: "CS301",
      title: "Data Structures and Algorithms",
      schedule: "Mon/Wed 10:00 AM - 11:30 AM",
      location: "Science Building, Room 205",
      enrolled: 45,
      status: "active"
    },
    {
      code: "CS401",
      title: "Artificial Intelligence",
      schedule: "Tue/Thu 1:00 PM - 2:30 PM",
      location: "Engineering Building, Room 110",
      enrolled: 38,
      status: "active"
    },
    {
      code: "CS550",
      title: "Advanced Database Systems",
      schedule: "Fri 2:00 PM - 5:00 PM",
      location: "Science Building, Room 310",
      enrolled: 22,
      status: "active"
    }
  ],
  announcements: [
    {
      id: 1,
      title: "CS301 Midterm Exam Date Change",
      category: "Course",
      date: "2025-04-03",
      content: "The midterm exam for CS301 has been moved from April 15th to April 17th. This change is to avoid conflict with the departmental symposium."
    },
    {
      id: 2,
      title: "Guest Lecture on AI Ethics",
      category: "Department",
      date: "2025-04-01",
      content: "Please inform your students about the upcoming guest lecture on AI Ethics by Dr. Jane Smith on April 10th from 3-5PM in the Main Auditorium."
    },
    {
      id: 3,
      title: "Office Hours Cancellation",
      category: "Personal",
      date: "2025-03-29",
      content: "My office hours for next Monday (April 7th) are cancelled due to a conference attendance. I'll hold additional hours on Wednesday."
    }
  ],
  projects: [
    {
      id: 1,
      title: "Campus Mobile App Development",
      description: "Development of a comprehensive mobile app for campus services and information.",
      vacancies: 3,
      applicants: 7,
      status: "active"
    },
    {
      id: 2,
      title: "AI Research Assistant",
      description: "Research assistant position for ongoing AI project in natural language processing.",
      vacancies: 2,
      applicants: 5,
      status: "active"
    },
    {
      id: 3,
      title: "Database Optimization Study",
      description: "Study to optimize campus database systems and improve query performance.",
      vacancies: 0,
      applicants: 4,
      status: "filled"
    }
  ]
};

export default function FacultyDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <DashboardShell>
        <DashboardHeader 
          heading={`Welcome, ${facultyData.name}`}
          text={`Faculty ID: ${facultyData.id} | Department: ${facultyData.department} | Position: ${facultyData.position}`}
        />
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>At a Glance</CardTitle>
                  <CardDescription>Overview of your teaching and research</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Active Courses</p>
                      <p className="text-2xl font-bold">{facultyData.courses.filter(c => c.status === "active").length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold">
                        {facultyData.courses.reduce((sum, course) => sum + course.enrolled, 0)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold">{facultyData.projects.filter(p => p.status === "active").length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Project Applicants</p>
                      <p className="text-2xl font-bold">
                        {facultyData.projects.reduce((sum, project) => sum + project.applicants, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Announcements Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Recent Announcements</CardTitle>
                  <CardDescription>Announcements you've posted recently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {facultyData.announcements.map((announcement) => (
                      <div key={announcement.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge>{announcement.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Posted on {new Date(announcement.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/announcements/create">
                    <Button>Create Announcement</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Link href="/dashboard/faculty/courses/create">
                <Button>Add New Course</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {facultyData.courses.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.code}: {course.title}</CardTitle>
                        <CardDescription>{course.schedule} | {course.location}</CardDescription>
                      </div>
                      <Badge variant={course.status === "active" ? "default" : "outline"}>
                        {course.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Enrolled Students:</strong> {course.enrolled}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/dashboard/faculty/courses/${course.code}`}>
                      <Button variant="outline">Manage Course</Button>
                    </Link>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/faculty/courses/${course.code}/announcements/create`}>
                        <Button variant="outline" size="sm">
                          Post Announcement
                        </Button>
                      </Link>
                      <Link href={`/dashboard/faculty/courses/${course.code}/assignments`}>
                        <Button variant="outline" size="sm">
                          Assignments
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Link href="/projects/create">
                <Button>Create New Project</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {facultyData.projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge variant={project.status === "active" ? "default" : "secondary"}>
                        {project.status === "active" ? "Active" : "Filled"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{project.description}</p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="font-medium">Vacancies:</span> {project.vacancies}
                      </div>
                      <div>
                        <span className="font-medium">Applicants:</span> {project.applicants}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-3">
                      <Link href={`/projects/${project.id}/applications`}>
                        <Button variant={project.applicants > 0 ? "default" : "outline"} size="sm">
                          {project.applicants} Application{project.applicants !== 1 && "s"}
                        </Button>
                      </Link>
                      <Link href={`/projects/${project.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit Project
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <Link href="/projects/create">
              <Button className="w-full" variant="outline">
                Post Project
              </Button>
            </Link>
            <Link href="/dashboard/faculty/calendar">
              <Button className="w-full" variant="outline">
                View Calendar
              </Button>
            </Link>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
} 