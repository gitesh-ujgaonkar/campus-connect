import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentAnnouncements } from "@/components/recent-announcements"
import { UpcomingEvents } from "@/components/upcoming-events"
import { LostFoundItems } from "@/components/lost-found-items"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Campus Portal</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your one-stop platform for campus announcements, events, academic schedules, and lost-and-found notices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Important updates from faculty and administration</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/announcements.svg?height=100&width=320"
                  alt="Announcements illustration"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              </CardContent>
              <CardFooter>
                <Link href="/announcements" className="w-full">
                  <Button className="w-full">View Announcements</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
                <CardDescription>Upcoming campus events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/events.svg?height=100&width=320"
                  alt="Events illustration"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              </CardContent>
              <CardFooter>
                <Link href="/events" className="w-full">
                  <Button className="w-full">View Events</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lost & Found</CardTitle>
                <CardDescription>Report or find lost items on campus</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="/lost.svg?height=100&width=320"
                  alt="Lost and found illustration"
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              </CardContent>
              <CardFooter>
                <Link href="/lost-found" className="w-full">
                  <Button className="w-full">View Lost & Found</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <Tabs defaultValue="announcements" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="announcements">Recent Announcements</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="lost-found">Lost & Found</TabsTrigger>
            </TabsList>
            <TabsContent value="announcements">
              <RecentAnnouncements />
            </TabsContent>
            <TabsContent value="events">
              <UpcomingEvents />
            </TabsContent>
            <TabsContent value="lost-found">
              <LostFoundItems />
            </TabsContent>
          </Tabs>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Campus Community</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Register to access all features including posting lost & found items, receiving notifications, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg">Register</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Campus Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

