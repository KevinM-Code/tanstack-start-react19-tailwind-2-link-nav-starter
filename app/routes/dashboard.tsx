
import { useUserEmail } from './__root';
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute('/dashboard')({  
  component: RouteComponent
})

function RouteComponent() {

  const { state, dispatch } = useUserEmail();
  const router = useRouter();

  if (state.email) {
    return (<div>You are logged in {state.email}</div>)
  }

  router.navigate({ to: '/login' })
  
  
}
