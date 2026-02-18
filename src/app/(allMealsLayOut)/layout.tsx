import { Navbar } from '@/components/navbar'
import React from 'react'

export default function AllMealsLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
