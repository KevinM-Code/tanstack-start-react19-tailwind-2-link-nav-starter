import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import { Fragment, Suspense, type ReactNode } from "react";
//import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import './main.css';
import Navigation from "../components/navigation";

import React, { createContext, useReducer, useContext } from 'react';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )

//Create the context
const defaultValue = {}
const UserEmailContext = createContext(defaultValue);

// Create the reducer function
const userEmailReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { email: action.payload };
    default:
      return state;
  }
};

// Create the context provider component
const UserEmailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userEmailReducer, { email: null });

  return (
    <UserEmailContext.Provider value={{ state, dispatch }}>
      {children}
    </UserEmailContext.Provider>
  );
};

// Custom hook to access the context
export const useUserEmail = () => {
  const context = useContext(UserEmailContext);
  if (context === undefined) {
    throw new Error('useUserEmail must be used within a UserEmailProvider');
  }
  return context;
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {

  return (
    <RootDocument>
      <UserEmailProvider >
        <Navigation />
        <Outlet />
      </UserEmailProvider>
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
        <link rel="stylesheet" href="/assets/ssr-DLOpnERD.css" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
