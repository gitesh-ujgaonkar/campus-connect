"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

// This would typically come from an API or database
const announcements = [
  {
    id: 1,
    title: "Campus Library Hours Extended",
    category: "Academic",
    date: "2025-04-03",
    author: "Library Administration",
    content:
      "The campus library will now be open until midnight on weekdays to accommodate students during finals week. Weekend hours remain unchanged. This change is effective immediately and will continue until the end of the semester. Study rooms can be reserved online through the library portal.",
  },
  {
    id: 2,
    title: "New Online Course Registration System",
    category: "Administrative",
    date: "2025-04-01",
    author: "Registrar's Office",
    content:
      "Starting next semester, all course registrations will be processed through our new online portal. Training sessions will be held next week. The new system includes features for waitlisting, prerequisite checking, and real-time seat availability. Students are encouraged to attend a training session before registration opens.",
  },
  {
    id: 3,
    title: "Campus Wi-Fi Maintenance",
    category: "Facilities",
    date: "2025-03-30",
    author: "IT Department",
    content:
      "Campus Wi-Fi will be undergoing maintenance this weekend. Expect intermittent connectivity in the Science Building. Alternative networks will be available in the library and student center. The maintenance is scheduled to complete by Sunday evening.",
  },
  {
    id: 4,
    title: "Emergency Evacuation Drill",
    category: "Emergency",
    date: "2025-03-28",
    author: "Campus Safety",
    content:
      "An emergency evacuation drill will be conducted next Tuesday at 10 AM. All students and faculty must participate and follow the evacuation procedures. Building marshals will be present to guide everyone to the designated assembly areas. The drill is expected to last approximately 30 minutes.",
  },
  {
    id: 5,
    title: "Student Council Elections",
    category: "General",
    date: "2025-03-25",
    author: "Student Affairs",
    content:
      "Nominations for Student Council elections are now open. Interested candidates can submit their applications by April 10th. Campaign period will begin on April 15th, with elections to be held on April 30th. For more information, visit the Student Affairs office or check the Student Portal.",
  },
];

// All possible announcement categories
const categories = ["All", "Academic", "Administrative", "Emergency", "Facilities", "General"];

export default function AnnouncementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter announcements based on selected category
  const filteredAnnouncements = selectedCategory === "All" 
    ? announcements 
    : announcements.filter(announcement => announcement.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Announcements</h1>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest news and information from campus.
          </p>
          
          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Admin action (only visible to admins/faculty) */}
          <div className="flex justify-end mb-4">
            <Link href="/announcements/create">
              <Button>Create Announcement</Button>
            </Link>
          </div>
        </div>
        
        {/* Announcements list */}
        <div className="space-y-6">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{announcement.title}</CardTitle>
                      <CardDescription>
                        Posted by {announcement.author} on {new Date(announcement.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge>{announcement.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{announcement.content}</p>
                </CardContent>
                <CardFooter className="bg-muted/50 pt-4">
                  <Link href={`/announcements/${announcement.id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No announcements found</h3>
              <p className="text-muted-foreground">There are no announcements in this category yet.</p>
            </div>
          )}
        </div>
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