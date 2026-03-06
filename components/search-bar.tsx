'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface SearchBarProps {
  defaultValue?: string
  placeholder?: string
  className?: string
  size?: 'default' | 'lg'
}

export function SearchBar({ 
  defaultValue = '', 
  placeholder = 'Buscar trámites, trámites internos, consultas...', 
  className = '',
  size = 'default'
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className={`absolute left-3 text-muted-foreground ${size === 'lg' ? 'top-4 h-5 w-5' : 'top-2.5 h-4 w-4'}`} />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${size === 'lg' ? 'h-14 pl-11 text-lg' : 'pl-10'}`}
        />
      </div>
      <Button type="submit" size={size === 'lg' ? 'lg' : 'default'} className={size === 'lg' ? 'h-14 px-8' : ''}>
        Buscar
      </Button>
    </form>
  )
}
