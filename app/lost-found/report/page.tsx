"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ReportLostFoundPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Lost",
    date: "",
    location: "",
    contact: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as "Lost" | "Found" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This would be an actual API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful submission
      console.log("Lost & Found report submitted", formData)
      router.push("/lost-found")
    } catch (err) {
      console.error("Error submitting report", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Report Lost or Found Item"
        text="Fill out the form below to report a lost or found item on campus."
      />

      <div className="grid gap-4">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help with recovery or identification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Item Status</Label>
                <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lost" id="lost" />
                    <Label htmlFor="lost">I lost an item</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Found" id="found" />
                    <Label htmlFor="found">I found an item</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Item Name</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Blue Backpack, Student ID Card"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the item..."
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required value={formData.date} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Library, 2nd Floor"
                    required
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="Email or phone number"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardShell>
  )
}

