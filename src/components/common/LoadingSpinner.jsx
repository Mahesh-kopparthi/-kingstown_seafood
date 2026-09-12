import React from 'react'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7fbff]" role="status" aria-label={message}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-ocean/20 border-t-ocean rounded-full animate-spin" />
        <p className="text-slate-500 font-medium text-sm">{message}</p>
      </div>
    </div>
  )
}
