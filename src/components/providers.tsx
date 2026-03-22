'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Providers({ children }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <SessionProvider session={null}>{children}</SessionProvider>
}
