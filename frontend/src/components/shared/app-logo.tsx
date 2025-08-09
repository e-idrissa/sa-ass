import { GalleryVerticalEndIcon } from 'lucide-react'
import React from 'react'

export const AppLogo = () => {
  return (
    <div className='flex items-center gap-2 bg-sidebar-accent p-4 mb-4 rounded-lg'>
      <GalleryVerticalEndIcon className='size-12 p-3 rounded-lg'/>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">Consult.co</h3>
        <p className="text-sm text-muted-foreground">Your health, our priority</p>
      </div>
    </div>
  )
}
