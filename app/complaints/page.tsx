"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ThumbsUp } from "lucide-react"
import { Header } from "@/components/header"

// This would typically come from an API or database
const initialComplaints = [
  {
    id: 1,
    title: "Poor WiFi Coverage in Dormitory B",
    description: "The WiFi signal is extremely weak on the 3rd floor of Dormitory B. This has been an issue for weeks and makes it difficult to attend online classes.",
    date: "2025-04-01",
    upvotes: 45,
    userUpvoted: false,
    solved: false,
  },
  {
    id: 2,
    title: "Cafeteria Food Quality",
    description: "The quality of food in the main cafeteria has significantly declined. Many items are served cold and the vegetarian options are very limited.",
    date: "2025-03-28",
    upvotes: 78,
    userUpvoted: false,
    solved: false,
  },
  {
    id: 3,
    title: "Broken Equipment in Chemistry Lab",
    description: "Several microscopes in the Chemistry lab (Room 305) are not functioning properly. This is affecting our ability to complete lab assignments.",
    date: "2025-03-25",
    upvotes: 23,
    userUpvoted: false,
    solved: true,
  },
  {
    id: 4,
    title: "Library Hours Too Limited",
    description: "The library closes at 7 PM on weekdays, which is too early for students who have evening classes. Please consider extending hours until at least 9 PM.",
    date: "2025-03-22",
    upvotes: 92,
    userUpvoted: true,
    solved: false,
  },
  {
    id: 5,
    title: "Parking Lot Lighting Issues",
    description: "The lighting in Parking Lot C is insufficient, making it unsafe for students leaving campus in the evening. Several lights appear to be burned out.",
    date: "2025-03-20",
    upvotes: 34,
    userUpvoted: false,
    solved: true,
  },
];

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [showSolved, setShowSolved] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter complaints based on solved status
  const filteredComplaints = showSolved
    ? complaints
    : complaints.filter(complaint => !complaint.solved);
    
  // Sort complaints by upvotes (highest first)
  const sortedComplaints = [...filteredComplaints].sort((a, b) => b.upvotes - a.upvotes);
  
  // Handle upvoting a complaint
  const handleUpvote = (id: number) => {
    setComplaints(prevComplaints => 
      prevComplaints.map(complaint => {
        if (complaint.id === id) {
          if (complaint.userUpvoted) {
            // User already upvoted, so remove upvote
            return { 
              ...complaint, 
              upvotes: complaint.upvotes - 1,
              userUpvoted: false
            };
          } else {
            // User has not upvoted, so add upvote
            return { 
              ...complaint, 
              upvotes: complaint.upvotes + 1,
              userUpvoted: true
            };
          }
        }
        return complaint;
      })
    );
  };
  
  // Handle new complaint form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComplaint(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle new complaint submission
  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComplaint.title.trim() || !newComplaint.description.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComplaintObj = {
        id: complaints.length + 1,
        title: newComplaint.title,
        description: newComplaint.description,
        date: new Date().toISOString().split('T')[0],
        upvotes: 0,
        userUpvoted: false,
        solved: false,
      };
      
      setComplaints(prev => [newComplaintObj, ...prev]);
      setNewComplaint({ title: "", description: "" });
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Toggle showing solved complaints
  const toggleShowSolved = () => {
    setShowSolved(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Campus Complaints</h1>
            <p className="text-muted-foreground mb-6">
              Submit anonymous complaints about campus issues. The most upvoted complaints will be prioritized.
            </p>
            
            {/* New Complaint Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Submit a New Complaint</CardTitle>
                <CardDescription>
                  Your complaint will be anonymous to other students, but administrators will know your identity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitComplaint}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="font-medium">Title</label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Brief title describing the issue"
                        value={newComplaint.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="font-medium">Description</label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide details about the issue, location, when it occurs, etc."
                        rows={4}
                        value={newComplaint.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Important Notice:</p>
                      <p>
                        While your complaint will appear anonymous to other students, administrators will have access
                        to your identity for accountability purposes. Please keep all complaints constructive and respectful.
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Complaint"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Complaints List */}
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Current Complaints</h2>
              <Button variant="outline" onClick={toggleShowSolved}>
                {showSolved ? "Hide Solved Complaints" : "Show Solved Complaints"}
              </Button>
            </div>
            
            {sortedComplaints.length > 0 ? (
              <div className="space-y-4">
                {sortedComplaints.map((complaint) => (
                  <Card key={complaint.id} className={complaint.solved ? "opacity-70" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{complaint.title}</CardTitle>
                          <CardDescription>
                            Submitted on {new Date(complaint.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        {complaint.solved && (
                          <Badge variant="outline">Solved</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{complaint.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">
                        {complaint.upvotes} {complaint.upvotes === 1 ? "upvote" : "upvotes"}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className={complaint.userUpvoted ? "bg-primary/10" : ""}
                        onClick={() => handleUpvote(complaint.id)}
                        disabled={complaint.solved}
                      >
                        <ThumbsUp className={`mr-2 h-4 w-4 ${complaint.userUpvoted ? "fill-primary" : ""}`} />
                        {complaint.userUpvoted ? "Upvoted" : "Upvote"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/40 rounded-lg">
                <h3 className="text-lg font-medium mb-1">No complaints found</h3>
                <p className="text-muted-foreground">
                  {showSolved
                    ? "There are no complaints in the system."
                    : "There are no active complaints. All issues have been resolved!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 