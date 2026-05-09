import { Suspense } from 'react'
import SharePageClient from './SharePageClient'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <SharePageClient />
    </Suspense>
  )
}