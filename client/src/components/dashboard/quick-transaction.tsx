"use client"

import { useState, useEffect } from "react"
import { fetchContacts, type Contact } from "@/lib/data/financial-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"

export function QuickTransaction() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContacts()
        setContacts(data)
      } catch (error) {
        console.error("Error fetching contacts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSend = () => {
    console.log("Sending", amount, "to", selectedContact)
    // Reset form
    setAmount("")
    setSelectedContact(null)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-16 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex justify-between overflow-x-auto pb-2 scrollbar-hide">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex flex-col items-center space-y-2 px-2">
                    <button
                      onClick={() => setSelectedContact(contact.id)}
                      className={`relative ${selectedContact === contact.id ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <Avatar className="h-14 w-14">
                        {contact.avatar ? (
                          <img
                            src={contact.avatar || "/placeholder.svg"}
                            alt={contact.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                      </Avatar>
                    </button>
                    <span className="text-xs text-center">{contact.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">$</span>
                <Input
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-0 border-b rounded-none focus-visible:ring-0 px-0 shadow-none"
                />
              </div>
              <Button className="w-full bg-[#0f1729]" disabled={!amount || !selectedContact} onClick={handleSend}>
                Send
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}


