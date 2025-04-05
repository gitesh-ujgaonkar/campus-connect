"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API or database
const lostItems = [
  {
    id: 1,
    title: "Black Laptop Bag",
    category: "Electronics",
    date: "2025-04-02",
    location: "Library, 2nd Floor",
    description: "Lost my black laptop bag with a Dell laptop inside. It has a small keychain attached to the zipper.",
    contact: "john.doe@example.edu",
    status: "lost",
    hasImage: true,
    imagePath: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    title: "Blue Water Bottle",
    category: "Personal Items",
    date: "2025-04-01",
    location: "Science Building, Room 305",
    description: "Lost my blue Hydro Flask water bottle during Physics class. It has stickers on it.",
    contact: "emma.smith@example.edu",
    status: "lost",
    hasImage: false,
  },
  {
    id: 3,
    title: "Student ID Card",
    category: "Documents",
    date: "2025-03-30",
    location: "Student Center",
    description: "Lost my student ID card. Name: Michael Johnson, ID: 12345678",
    contact: "michael.johnson@example.edu",
    status: "lost",
    hasImage: false,
  },
  {
    id: 4,
    title: "Prescription Glasses",
    category: "Personal Items",
    date: "2025-03-29",
    location: "Gymnasium",
    description: "Lost my prescription glasses with black frames during the basketball game.",
    contact: "sarah.williams@example.edu",
    status: "lost",
    hasImage: true,
    imagePath: "/placeholder.svg?height=100&width=200",
  },
];

const foundItems = [
  {
    id: 1,
    title: "Silver Watch",
    category: "Accessories",
    date: "2025-04-03",
    location: "Engineering Building, Room 201",
    description: "Found a silver wristwatch on a desk in the Engineering Building.",
    contact: "professor.brown@example.edu",
    status: "found",
    hasImage: true,
    imagePath: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    title: "USB Flash Drive",
    category: "Electronics",
    date: "2025-04-02",
    location: "Computer Lab",
    description: "Found a 32GB USB flash drive with a red case in the computer lab.",
    contact: "tech.support@example.edu",
    status: "found",
    hasImage: false,
  },
  {
    id: 3,
    title: "Textbook: Organic Chemistry",
    category: "Books",
    date: "2025-04-01",
    location: "Cafeteria",
    description: "Found an Organic Chemistry textbook (8th Edition) at a table in the cafeteria.",
    contact: "librarian@example.edu",
    status: "found",
    hasImage: true,
    imagePath: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 4,
    title: "House Keys",
    category: "Keys",
    date: "2025-03-31",
    location: "Parking Lot B",
    description: "Found a set of house keys with a blue keychain in Parking Lot B.",
    contact: "security@example.edu",
    status: "found",
    hasImage: false,
  },
];

// All item categories
const categories = ["All", "Electronics", "Documents", "Books", "Accessories", "Keys", "Personal Items"];

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState("lost");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter items based on selected category
  const filteredLostItems = selectedCategory === "All" 
    ? lostItems 
    : lostItems.filter(item => item.category === selectedCategory);
    
  const filteredFoundItems = selectedCategory === "All" 
    ? foundItems 
    : foundItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>
          <p className="text-muted-foreground mb-6">
            Report lost items or help return found items to their owners.
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/lost-found/report-lost">
              <Button>Report Lost Item</Button>
            </Link>
            <Link href="/lost-found/report-found">
              <Button variant="outline">Report Found Item</Button>
            </Link>
          </div>
          
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
        </div>
        
        <Tabs defaultValue="lost" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>
          
          {/* Lost Items Tab */}
          <TabsContent value="lost">
            <div className="space-y-6">
              {filteredLostItems.length > 0 ? (
                filteredLostItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Lost on {new Date(item.date).toLocaleDateString()} at {item.location}
                          </p>
                        </div>
                        <Badge>{item.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {item.hasImage && (
                        <div className="mb-4">
                          <img 
                            src={item.imagePath} 
                            alt={item.title} 
                            className="rounded-md max-h-48 object-cover"
                          />
                        </div>
                      )}
                      <p>{item.description}</p>
                      <p className="mt-2 text-sm">Contact: {item.contact}</p>
                    </CardContent>
                    <CardFooter className="bg-muted/50 pt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        I Found This
                      </Button>
                      <Button size="sm">Contact Owner</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No lost items found</h3>
                  <p className="text-muted-foreground">There are no lost items in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Found Items Tab */}
          <TabsContent value="found">
            <div className="space-y-6">
              {filteredFoundItems.length > 0 ? (
                filteredFoundItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Found on {new Date(item.date).toLocaleDateString()} at {item.location}
                          </p>
                        </div>
                        <Badge>{item.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {item.hasImage && (
                        <div className="mb-4">
                          <img 
                            src={item.imagePath} 
                            alt={item.title} 
                            className="rounded-md max-h-48 object-cover"
                          />
                        </div>
                      )}
                      <p>{item.description}</p>
                      <p className="mt-2 text-sm">Contact: {item.contact}</p>
                    </CardContent>
                    <CardFooter className="bg-muted/50 pt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        This Is Mine
                      </Button>
                      <Button size="sm">Contact Finder</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No found items</h3>
                  <p className="text-muted-foreground">There are no found items in this category.</p>
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