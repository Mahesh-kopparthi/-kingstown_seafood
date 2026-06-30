import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7fbff]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-ocean border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
