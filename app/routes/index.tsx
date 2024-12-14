import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getCount, updateCount } from "../server-functions";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const state = Route.useLoaderData();
  const router = useRouter();

  return (
    <Fragment>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                updateCount({
                  data: {
                    increment: 2,
                  },
                }).then(() => router.invalidate());
              }}      
      >
        Add to {state}
      </button>
      {/* <button
        type="button"
        onClick={() => {
          updateCount({
            data: {
              increment: 2,
            },
          }).then(() => router.invalidate());
        }}
      >
        Add to {state}
      </button> */}

    </Fragment>

  );
}
