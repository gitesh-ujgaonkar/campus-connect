"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"

// This would typically come from an API or database
const academicSchedule = [
  {
    id: 1,
    title: "Fall Semester Registration",
    date: "August 15-20, 2025",
    description: "Course registration for all students for the Fall semester.",
  },
  {
    id: 2,
    title: "Classes Begin",
    date: "September 1, 2025",
    description: "First day of classes for the Fall semester.",
  },
  {
    id: 3,
    title: "Add/Drop Deadline",
    date: "September 15, 2025",
    description: "Last day to add or drop courses without a 'W' grade.",
  },
  {
    id: 4,
    title: "Midterm Examination Week",
    date: "October 20-25, 2025",
    description: "Midterm examinations for all courses.",
  },
  {
    id: 5,
    title: "Thanksgiving Break",
    date: "November 26-30, 2025",
    description: "No classes during Thanksgiving break.",
  },
  {
    id: 6,
    title: "Last Day of Classes",
    date: "December 10, 2025",
    description: "Final day of instruction for the Fall semester.",
  },
  {
    id: 7,
    title: "Final Examination Period",
    date: "December 15-20, 2025",
    description: "Final examinations for all courses.",
  },
  {
    id: 8,
    title: "Winter Break Begins",
    date: "December 21, 2025",
    description: "Winter break begins for all students.",
  },
];

const examSchedule = [
  {
    id: 1,
    course: "CS101: Introduction to Computer Science",
    date: "December 15, 2025",
    time: "9:00 AM - 11:00 AM",
    location: "Science Building, Room 101",
  },
  {
    id: 2,
    course: "MATH201: Calculus II",
    date: "December 15, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Engineering Building, Room 203",
  },
  {
    id: 3,
    course: "ENG102: Composition and Rhetoric",
    date: "December 16, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Humanities Building, Room 305",
  },
  {
    id: 4,
    course: "PHYS201: Physics I",
    date: "December 16, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Science Building, Room 210",
  },
  {
    id: 5,
    course: "CHEM101: General Chemistry",
    date: "December 17, 2025",
    time: "9:00 AM - 11:00 AM",
    location: "Science Building, Room 150",
  },
  {
    id: 6,
    course: "BIO101: Introduction to Biology",
    date: "December 17, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Science Building, Room 175",
  },
  {
    id: 7,
    course: "HIST101: World History",
    date: "December 18, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Humanities Building, Room 220",
  },
  {
    id: 8,
    course: "PSYC101: Introduction to Psychology",
    date: "December 18, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Social Sciences Building, Room 110",
  },
];

const campusEvents = [
  {
    id: 1,
    title: "New Student Orientation",
    date: "August 25-28, 2025",
    location: "Multiple Campus Locations",
    description: "Orientation activities for all new students.",
  },
  {
    id: 2,
    title: "Homecoming Week",
    date: "October 5-11, 2025",
    location: "Various Campus Venues",
    description: "Annual homecoming celebrations including parade, game, and alumni events.",
  },
  {
    id: 3,
    title: "Fall Career Fair",
    date: "October 15, 2025",
    location: "Student Center",
    description: "Opportunities to meet with potential employers.",
  },
  {
    id: 4,
    title: "Winter Formal",
    date: "December 5, 2025",
    location: "Grand Ballroom",
    description: "Annual winter formal dance event.",
  },
];

export default function SchedulesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter function for academic schedule
  const filteredAcademicSchedule = academicSchedule.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter function for exam schedule
  const filteredExamSchedule = examSchedule.filter(item =>
    item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter function for campus events
  const filteredCampusEvents = campusEvents.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Campus Schedules</h1>
          <p className="text-muted-foreground mb-6">
            View academic schedules, exam timetables, and campus events.
          </p>
          
          {/* Search input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search schedules..."
              className="w-full p-2 pl-8 border rounded-md border-input bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-2.5 top-2.5">🔍</span>
          </div>
        </div>
        
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="academic">Academic Calendar</TabsTrigger>
            <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
            <TabsTrigger value="events">Campus Events</TabsTrigger>
          </TabsList>
          
          {/* Academic Calendar Tab */}
          <TabsContent value="academic">
            <div className="space-y-4">
              {filteredAcademicSchedule.length > 0 ? (
                filteredAcademicSchedule.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <p className="text-sm font-medium text-muted-foreground">{item.date}</p>
                    </CardHeader>
                    <CardContent>
                      <p>{item.description}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No schedule items found</h3>
                  <p className="text-muted-foreground">Try a different search term.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Exam Schedule Tab */}
          <TabsContent value="exams">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left">Course</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExamSchedule.length > 0 ? (
                    filteredExamSchedule.map((exam) => (
                      <tr key={exam.id} className="border-b">
                        <td className="p-3">{exam.course}</td>
                        <td className="p-3">{exam.date}</td>
                        <td className="p-3">{exam.time}</td>
                        <td className="p-3">{exam.location}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center">
                        <h3 className="text-lg font-medium">No exams found</h3>
                        <p className="text-muted-foreground">Try a different search term.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Campus Events Tab */}
          <TabsContent value="events">
            <div className="space-y-4">
              {filteredCampusEvents.length > 0 ? (
                filteredCampusEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <p className="text-sm font-medium text-muted-foreground">
                        {event.date} | {event.location}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No events found</h3>
                  <p className="text-muted-foreground">Try a different search term.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Back to top button */}
      <BackToTopButton />
    </div>
  );
}

// Back to Top Button Component
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  // Only run on client side
  if (typeof window !== 'undefined') {
    // When the component mounts, add scroll event listener
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {visible && (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </Button>
      )}
    </>
  );
} 