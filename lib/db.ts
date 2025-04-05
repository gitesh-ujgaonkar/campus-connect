// This is a mock database service
// In a real application, this would connect to a real database

export type UserRole = "student" | "faculty" | "admin"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  createdAt: Date
}

export interface Announcement {
  id: string
  title: string
  content: string
  category: string
  authorId: string
  createdAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  category: string
  date: Date
  time: string
  location: string
  organizerId: string
  createdAt: Date
}

export interface Schedule {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  authorId: string
  createdAt: Date
}

export interface LostFoundItem {
  id: string
  title: string
  description: string
  type: "Lost" | "Found"
  date: Date
  location: string
  contact: string
  reporterId: string
  createdAt: Date
}

// Mock data
const users: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "student",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "faculty",
    createdAt: new Date("2025-01-02"),
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date("2025-01-03"),
  },
]

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Campus Library Hours Extended",
    content:
      "The campus library will now be open until midnight on weekdays to accommodate students during finals week.",
    category: "Academic",
    authorId: "2",
    createdAt: new Date("2025-04-03"),
  },
  {
    id: "2",
    title: "New Online Course Registration System",
    content:
      "Starting next semester, all course registrations will be processed through our new online portal. Training sessions will be held next week.",
    category: "Administrative",
    authorId: "3",
    createdAt: new Date("2025-04-01"),
  },
  {
    id: "3",
    title: "Campus Wi-Fi Maintenance",
    content:
      "Campus Wi-Fi will be undergoing maintenance this weekend. Expect intermittent connectivity in the Science Building.",
    category: "Facilities",
    authorId: "3",
    createdAt: new Date("2025-03-30"),
  },
]

const events: Event[] = [
  {
    id: "1",
    title: "Spring Career Fair",
    description: "Connect with over 50 employers from various industries. Bring your resume and dress professionally.",
    category: "Career",
    date: new Date("2025-04-15"),
    time: "10:00 AM - 4:00 PM",
    location: "Student Union Building",
    organizerId: "2",
    createdAt: new Date("2025-03-15"),
  },
  {
    id: "2",
    title: "Guest Lecture: AI Ethics",
    description:
      "Dr. Jane Smith from Tech University will discuss ethical considerations in artificial intelligence development.",
    category: "Academic",
    date: new Date("2025-04-10"),
    time: "2:00 PM - 3:30 PM",
    location: "Auditorium A",
    organizerId: "2",
    createdAt: new Date("2025-03-20"),
  },
  {
    id: "3",
    title: "Campus Music Festival",
    description:
      "Join us for live performances by student bands and special guest artists. Food trucks will be available.",
    category: "Entertainment",
    date: new Date("2025-04-20"),
    time: "5:00 PM - 10:00 PM",
    location: "Campus Quad",
    organizerId: "3",
    createdAt: new Date("2025-03-25"),
  },
]

const lostFoundItems: LostFoundItem[] = [
  {
    id: "1",
    title: "Blue Water Bottle",
    description: "Found a blue Hydro Flask water bottle after the Chemistry lecture.",
    type: "Found",
    date: new Date("2025-04-04"),
    location: "Science Building, Room 203",
    contact: "Campus Security Office",
    reporterId: "1",
    createdAt: new Date("2025-04-04"),
  },
  {
    id: "2",
    title: "Silver MacBook Pro",
    description: "Lost my MacBook Pro with stickers on the cover. Last seen in the study area.",
    type: "Lost",
    date: new Date("2025-04-03"),
    location: "Library, 2nd Floor",
    contact: "john.doe@student.edu",
    reporterId: "1",
    createdAt: new Date("2025-04-03"),
  },
  {
    id: "3",
    title: "Student ID Card",
    description: "Found a student ID card for Sarah Johnson during lunch hour.",
    type: "Found",
    date: new Date("2025-04-02"),
    location: "Cafeteria",
    contact: "Student Services Desk",
    reporterId: "2",
    createdAt: new Date("2025-04-02"),
  },
]

// Mock database functions
export const db = {
  // User functions
  getUser: async (id: string): Promise<User | null> => {
    return users.find((user) => user.id === id) || null
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    return users.find((user) => user.email === email) || null
  },

  createUser: async (userData: Omit<User, "id" | "createdAt">): Promise<User> => {
    const newUser: User = {
      id: String(users.length + 1),
      ...userData,
      createdAt: new Date(),
    }
    users.push(newUser)
    return newUser
  },

  // Announcement functions
  getAnnouncements: async (): Promise<Announcement[]> => {
    return [...announcements].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  },

  getAnnouncement: async (id: string): Promise<Announcement | null> => {
    return announcements.find((announcement) => announcement.id === id) || null
  },

  createAnnouncement: async (data: Omit<Announcement, "id" | "createdAt">): Promise<Announcement> => {
    const newAnnouncement: Announcement = {
      id: String(announcements.length + 1),
      ...data,
      createdAt: new Date(),
    }
    announcements.push(newAnnouncement)
    return newAnnouncement
  },

  // Event functions
  getEvents: async (): Promise<Event[]> => {
    return [...events].sort((a, b) => a.date.getTime() - b.date.getTime())
  },

  getEvent: async (id: string): Promise<Event | null> => {
    return events.find((event) => event.id === id) || null
  },

  createEvent: async (data: Omit<Event, "id" | "createdAt">): Promise<Event> => {
    const newEvent: Event = {
      id: String(events.length + 1),
      ...data,
      createdAt: new Date(),
    }
    events.push(newEvent)
    return newEvent
  },

  // Lost & Found functions
  getLostFoundItems: async (): Promise<LostFoundItem[]> => {
    return [...lostFoundItems].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  },

  getLostFoundItem: async (id: string): Promise<LostFoundItem | null> => {
    return lostFoundItems.find((item) => item.id === id) || null
  },

  createLostFoundItem: async (data: Omit<LostFoundItem, "id" | "createdAt">): Promise<LostFoundItem> => {
    const newItem: LostFoundItem = {
      id: String(lostFoundItems.length + 1),
      ...data,
      createdAt: new Date(),
    }
    lostFoundItems.push(newItem)
    return newItem
  },
}

