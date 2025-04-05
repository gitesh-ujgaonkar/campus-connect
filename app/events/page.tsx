"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

// This would typically come from an API or database
const events = [
  {
    id: 1,
    title: "Annual Tech Fest",
    category: "Cultural",
    date: "2025-04-15",
    time: "10:00 AM - 5:00 PM",
    location: "Main Auditorium",
    organizer: "Computer Science Department",
    description:
      "The Annual Tech Fest features coding competitions, hackathons, tech talks, and exhibitions from industry leaders. Open to all students across departments. Registration is required for participation in competitions.",
  },
  {
    id: 2,
    title: "Career Fair",
    category: "Career",
    date: "2025-04-20",
    time: "9:00 AM - 4:00 PM",
    location: "Student Center",
    organizer: "Career Services",
    description:
      "Meet representatives from over 50 companies looking to hire interns and full-time employees. Bring your resume and dress professionally. Pre-registration through the Career Services portal is recommended but not required.",
  },
  {
    id: 3,
    title: "Alumni Networking Mixer",
    category: "Networking",
    date: "2025-04-25",
    time: "6:00 PM - 8:00 PM",
    location: "Faculty Lounge",
    organizer: "Alumni Association",
    description:
      "Connect with successful alumni from various industries and learn about career opportunities. Light refreshments will be served. Limited spots available, registration required through the Alumni Portal.",
  },
  {
    id: 4,
    title: "Environmental Awareness Workshop",
    category: "Workshop",
    date: "2025-04-22",
    time: "2:00 PM - 4:00 PM",
    location: "Science Building, Room 305",
    organizer: "Environmental Science Club",
    description:
      "Learn about sustainable practices and how to reduce your carbon footprint. Includes hands-on activities and take-home materials. Open to all students, faculty, and staff. No registration required.",
  },
  {
    id: 5,
    title: "International Food Festival",
    category: "Cultural",
    date: "2025-04-28",
    time: "12:00 PM - 3:00 PM",
    location: "Campus Quad",
    organizer: "International Student Association",
    description:
      "Celebrate diversity through food from around the world. Student organizations will be serving dishes from their home countries. Food tickets can be purchased at the event. All proceeds go to the International Student Scholarship Fund.",
  },
];

// All possible event categories
const categories = ["All", "Career", "Cultural", "Academic", "Sports", "Workshop", "Networking"];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter events based on selected category
  const filteredEvents = selectedCategory === "All" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Campus Events</h1>
          <p className="text-muted-foreground mb-6">
            Discover and participate in upcoming events happening on campus.
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
            <Link href="/events/create">
              <Button>Create Event</Button>
            </Link>
          </div>
        </div>
        
        {/* Events list */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        {new Date(event.date).toLocaleDateString()} | {event.time} | {event.location}
                      </CardDescription>
                    </div>
                    <Badge>{event.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm text-muted-foreground">Organized by: {event.organizer}</p>
                  <p className="line-clamp-3">{event.description}</p>
                </CardContent>
                <CardFooter className="bg-muted/50 pt-4">
                  <Link href={`/events/${event.id}`}>
                    <Button variant="outline" size="sm" className="mr-2">
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm">Register</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-muted-foreground">There are no events in this category yet.</p>
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