import { createFileRoute, useRouter } from '@tanstack/react-router'

import { logoutFn } from '../auth-server'
import { useEffect } from 'react'
import { useUserEmail } from '../utils/context';


export const Route = createFileRoute("/logout")({
  component: Logout,
  preload: false,
  loader: () => logoutFn(),
});

function Logout() {
  const { state, dispatch } = useUserEmail();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: 'SET_EMAIL', payload: false });

    router.invalidate()
    router.navigate({ to: '/' })

  }, [state.email])
}