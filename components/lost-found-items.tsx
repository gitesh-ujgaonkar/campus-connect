import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"

// This would typically come from an API or database
const lostFoundItems = [
  {
    id: 1,
    title: "Blue Water Bottle",
    type: "Found",
    date: "2025-04-04",
    location: "Science Building, Room 203",
    description: "Found a blue Hydro Flask water bottle after the Chemistry lecture.",
    contact: "Campus Security Office",
  },
  {
    id: 2,
    title: "Silver MacBook Pro",
    type: "Lost",
    date: "2025-04-03",
    location: "Library, 2nd Floor",
    description: "Lost my MacBook Pro with stickers on the cover. Last seen in the study area.",
    contact: "john.doe@student.edu",
  },
  {
    id: 3,
    title: "Student ID Card",
    type: "Found",
    date: "2025-04-02",
    location: "Cafeteria",
    description: "Found a student ID card for Sarah Johnson during lunch hour.",
    contact: "Student Services Desk",
  },
]

export function LostFoundItems() {
  return (
    <div className="space-y-4">
      {lostFoundItems.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                </CardDescription>
              </div>
              <Badge variant={item.type === "Lost" ? "destructive" : "default"}>{item.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p>{item.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Contact: {item.contact}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/lost-found/${item.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <div className="text-center mt-6 space-y-4">
        <Link href="/lost-found">
          <Button variant="outline">View All Items</Button>
        </Link>
        <div>
          <Link href="/lost-found/report">
            <Button>Report Lost or Found Item</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

