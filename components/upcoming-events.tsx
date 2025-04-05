import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const events = [
  {
    id: 1,
    title: "Spring Career Fair",
    category: "Career",
    date: "2025-04-15",
    time: "10:00 AM - 4:00 PM",
    location: "Student Union Building",
    excerpt: "Connect with over 50 employers from various industries. Bring your resume and dress professionally.",
  },
  {
    id: 2,
    title: "Guest Lecture: AI Ethics",
    category: "Academic",
    date: "2025-04-10",
    time: "2:00 PM - 3:30 PM",
    location: "Auditorium A",
    excerpt:
      "Dr. Jane Smith from Tech University will discuss ethical considerations in artificial intelligence development.",
  },
  {
    id: 3,
    title: "Campus Music Festival",
    category: "Entertainment",
    date: "2025-04-20",
    time: "5:00 PM - 10:00 PM",
    location: "Campus Quad",
    excerpt: "Join us for live performances by student bands and special guest artists. Food trucks will be available.",
  },
]

export function UpcomingEvents() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardDescription>
              </div>
              <Badge>{event.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p>{event.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/events/${event.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <div className="text-center mt-6">
        <Link href="/events">
          <Button variant="outline">View All Events</Button>
        </Link>
      </div>
    </div>
  )
}

