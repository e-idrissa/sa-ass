"use client"

import { FunnelIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction, useState } from "react"
import { formatDate } from "@/lib/utils"

interface Props {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

export function Filter({ date, setDate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? formatDate(date) : "Filter"}
            <FunnelIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
