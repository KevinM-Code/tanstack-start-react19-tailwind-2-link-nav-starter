// app/services/session.server.ts
import { useSession } from 'vinxi/http'

type SessionUser = {
  user: string
  role: string
}

export function useAppSession() {
  return useSession<SessionUser>({
    password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
  })
}
