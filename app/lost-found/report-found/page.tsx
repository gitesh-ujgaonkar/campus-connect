"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"

export default function ReportFoundItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    description: "",
    contact: "",
    image: null as File | null,
    imagePreview: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories for the select dropdown
  const categories = ["Electronics", "Documents", "Books", "Accessories", "Keys", "Personal Items", "Other"];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle select input changes
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Create a preview URL for the image
      const imagePreview = URL.createObjectURL(file);
      
      setFormData({
        ...formData,
        image: file,
        imagePreview,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would send this data to your backend
    console.log("Submitting found item report:", formData);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to lost & found page after submission
      router.push("/lost-found?success=true");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/lost-found">
              <Button variant="ghost" className="p-0">
                ← Back to Lost & Found
              </Button>
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Report a Found Item</CardTitle>
              <CardDescription>
                Fill out the form below with details about the item you found. The more information you provide, the better chance of finding the owner.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Item Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Name/Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="E.g., Blue Backpack, Student ID Card"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Date Found */}
                  <div className="space-y-2">
                    <Label htmlFor="date">When did you find it? *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Where did you find it? *</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="E.g., Library 2nd Floor, Cafeteria"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide a detailed description of the item, but avoid including unique identifying details that only the owner would know."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Hold back some identifying details so that the true owner can verify the item is theirs.
                    </p>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Information *</Label>
                    <Input
                      id="contact"
                      name="contact"
                      placeholder="Email or phone number"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Upload Image (Optional)</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a clear image of the item, but consider blurring or hiding unique identifiers (max 5MB)
                    </p>
                    
                    {/* Image Preview */}
                    {formData.imagePreview && (
                      <div className="mt-2">
                        <p className="text-sm mb-1">Image Preview:</p>
                        <img
                          src={formData.imagePreview}
                          alt="Item preview"
                          className="max-h-48 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/50 flex flex-col items-start text-sm text-muted-foreground">
              <p>* Required fields</p>
              <p className="mt-1">
                Thank you for helping return this item to its owner. The item will be listed as found on the Lost & Found page.
              </p>
              <p className="mt-1">
                Alternatively, you can turn in the found item to the campus lost and found office located in the Student Center.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
} 