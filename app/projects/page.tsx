"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

// This would typically come from an API or database
const projects = [
  {
    id: 1,
    title: "Campus Mobile App Development",
    description: "Development of a comprehensive mobile app for campus services, events, and information. The app will include features such as campus maps, event calendars, announcement notifications, and integration with the student portal.",
    department: "Computer Science",
    postedBy: {
      name: "Dr. Emily Chen",
      role: "Faculty",
      id: "FAC10045"
    },
    vacancies: 3,
    requirements: "Experience with React Native or Flutter, API integration, and UI/UX design. Knowledge of backend development is a plus.",
    duration: "3 months",
    postedDate: "2025-03-15",
    deadline: "2025-04-30"
  },
  {
    id: 2,
    title: "AI Research Assistant",
    description: "Research assistant position for ongoing AI project in natural language processing. The project focuses on developing algorithms for improved sentiment analysis in social media texts.",
    department: "Computer Science",
    postedBy: {
      name: "Dr. Emily Chen",
      role: "Faculty",
      id: "FAC10045"
    },
    vacancies: 2,
    requirements: "Strong background in machine learning and NLP. Proficiency in Python and experience with libraries such as TensorFlow or PyTorch.",
    duration: "6 months",
    postedDate: "2025-03-20",
    deadline: "2025-04-15"
  },
  {
    id: 3,
    title: "Student Services Database Optimization",
    description: "Project to optimize and improve the campus database systems that handle student services, including registration, housing, and financial aid.",
    department: "Information Technology",
    postedBy: {
      name: "Prof. Michael Wilson",
      role: "Faculty",
      id: "FAC10056"
    },
    vacancies: 1,
    requirements: "Strong knowledge of database systems (SQL), query optimization, and data modeling. Experience with Oracle or PostgreSQL preferred.",
    duration: "4 months",
    postedDate: "2025-03-25",
    deadline: "2025-04-20"
  },
  {
    id: 4,
    title: "Campus Sustainability Initiative",
    description: "Research and implementation project focused on improving campus sustainability practices, including waste reduction, energy efficiency, and promoting eco-friendly behaviors.",
    department: "Environmental Science",
    postedBy: {
      name: "Dr. Sarah Johnson",
      role: "Faculty",
      id: "FAC10078"
    },
    vacancies: 4,
    requirements: "Background in environmental science, sustainability studies, or related fields. Strong research and data analysis skills. Passion for environmental issues.",
    duration: "5 months",
    postedDate: "2025-03-10",
    deadline: "2025-04-25"
  },
  {
    id: 5,
    title: "Virtual Campus Tour Development",
    description: "Creation of an interactive virtual campus tour using 360° photography and VR technology. This project aims to provide prospective students with an immersive campus experience regardless of their location.",
    department: "Media Arts",
    postedBy: {
      name: "Alex Thompson",
      role: "Student",
      id: "ST20089"
    },
    vacancies: 2,
    requirements: "Experience with 360° photography, VR development, and web-based interactive media. Knowledge of Unity or similar platforms is beneficial.",
    duration: "3 months",
    postedDate: "2025-03-28",
    deadline: "2025-04-22"
  }
];

// Departments for filtering
const departments = ["All Departments", "Computer Science", "Information Technology", "Environmental Science", "Media Arts"];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  
  // Filter projects based on search query and selected department
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.postedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = 
      selectedDepartment === "All Departments" || 
      project.department === selectedDepartment;
      
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Open Projects</h1>
            <p className="text-muted-foreground mb-6">
              Browse and apply for ongoing campus projects that match your skills and interests.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search projects by title, description, or posted by..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {departments.map((department) => (
                  <Button
                    key={department}
                    variant={selectedDepartment === department ? "default" : "outline"}
                    onClick={() => setSelectedDepartment(department)}
                    className="whitespace-nowrap"
                  >
                    {department}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Create Project Button (only visible to faculty and admin) */}
            <div className="flex justify-end mb-4">
              <Link href="/projects/create">
                <Button>Post New Project</Button>
              </Link>
            </div>
          </div>
          
          {/* Projects List */}
          {filteredProjects.length > 0 ? (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                          {project.department} | Posted by: {project.postedBy.name} ({project.postedBy.role})
                        </CardDescription>
                      </div>
                      <Badge className="ml-2">
                        {project.vacancies} {project.vacancies === 1 ? "Vacancy" : "Vacancies"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{project.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Requirements:</span> {project.requirements}</p>
                      <p><span className="font-medium">Duration:</span> {project.duration}</p>
                      <p><span className="font-medium">Deadline:</span> {new Date(project.deadline).toLocaleDateString()} </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      Posted on {new Date(project.postedDate).toLocaleDateString()}
                    </p>
                    <Link href={`/projects/${project.id}/apply`}>
                      <Button>Apply Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/40 rounded-lg">
              <h3 className="text-lg font-medium mb-1">No projects found</h3>
              <p className="text-muted-foreground">
                No projects match your current filters. Try adjusting your search or department selection.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 