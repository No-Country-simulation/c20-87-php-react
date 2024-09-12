// app/providers.tsx

import {NextUIProvider} from '@nextui-org/react'

export function ProvidersNext({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}