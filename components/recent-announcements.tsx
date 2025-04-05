import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const announcements = [
  {
    id: 1,
    title: "Campus Library Hours Extended",
    category: "Academic",
    date: "2025-04-03",
    author: "Library Administration",
    excerpt:
      "The campus library will now be open until midnight on weekdays to accommodate students during finals week.",
  },
  {
    id: 2,
    title: "New Online Course Registration System",
    category: "Administrative",
    date: "2025-04-01",
    author: "Registrar's Office",
    excerpt:
      "Starting next semester, all course registrations will be processed through our new online portal. Training sessions will be held next week.",
  },
  {
    id: 3,
    title: "Campus Wi-Fi Maintenance",
    category: "Facilities",
    date: "2025-03-30",
    author: "IT Department",
    excerpt:
      "Campus Wi-Fi will be undergoing maintenance this weekend. Expect intermittent connectivity in the Science Building.",
  },
]

export function RecentAnnouncements() {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id}>
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
            <p>{announcement.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/announcements/${announcement.id}`}>
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <div className="text-center mt-6">
        <Link href="/announcements">
          <Button variant="outline">View All Announcements</Button>
        </Link>
      </div>
    </div>
  )
}

