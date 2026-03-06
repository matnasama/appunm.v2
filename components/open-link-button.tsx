'use client'

import { resolveUnmFileUrl } from '@/lib/utils'

interface OpenLinkButtonProps {
  url: string
  label?: string
}

export function OpenLinkButton({ url, label = 'ver plan' }: OpenLinkButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    window.open(resolveUnmFileUrl(url), '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="text-primary underline hover:no-underline bg-transparent border-none cursor-pointer p-0 h-auto font-inherit text-inherit"
    >
      {label}
    </button>
  )
}
