import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useUserEmail } from './__root'
import { logoutFn } from '../auth-server'
import { useEffect } from 'react'


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

    console.log("The State ", state)

    router.invalidate()
    router.navigate({ to: '/' })

  }, [state.email])
}