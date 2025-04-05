import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function DashboardPage() {
  // In a real application, this would be fetched from an API
  const userRole = "faculty" // Could be "student", "faculty", or "admin"

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your campus portal." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 new since last login</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost & Found</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="m21 8-2 2-5.5-5.5 2-2L21 8Z" />
              <path d="M14.5 13.5 11 17l-4 1 1-4 3.5-3.5" />
              <path d="M14.5 4.5 19 9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">5 new items reported</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-content">My Content</TabsTrigger>
          {userRole !== "student" && <TabsTrigger value="create">Create Content</TabsTrigger>}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest announcements from faculty and administration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Announcement Title {i}</p>
                        <p className="text-sm text-muted-foreground">Posted on April {i}, 2025</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Link href="/announcements">
                    <Button variant="outline">View All Announcements</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events happening in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Event Title {i}</p>
                        <p className="text-sm text-muted-foreground">April {i + 5}, 2025 at 2:00 PM</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Link href="/events">
                    <Button variant="outline">View All Events</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="my-content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Content</CardTitle>
              <CardDescription>Content you've created or interacted with</CardDescription>
            </CardHeader>
            <CardContent>
              {userRole === "student" ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">My Lost & Found Reports</h3>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Lost Item {i}</p>
                            <p className="text-sm text-muted-foreground">Reported on April {i}, 2025</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href="/lost-found/report">
                      <Button>Report New Lost/Found Item</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">My Announcements</h3>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Announcement {i}</p>
                            <p className="text-sm text-muted-foreground">Posted on April {i}, 2025</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">My Events</h3>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Event {i}</p>
                            <p className="text-sm text-muted-foreground">Scheduled for April {i + 10}, 2025</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {userRole !== "student" && (
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>Create new announcements, events, or schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/announcements/create">
                    <Button className="w-full h-24 text-lg">Create Announcement</Button>
                  </Link>
                  <Link href="/events/create">
                    <Button className="w-full h-24 text-lg">Create Event</Button>
                  </Link>
                  <Link href="/schedules/create">
                    <Button className="w-full h-24 text-lg">Create Schedule</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </DashboardShell>
  )
}

