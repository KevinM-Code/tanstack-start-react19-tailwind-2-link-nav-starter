# tanstack-start-react19-tailwind-2-link-nav-starter
A Tanstack Start starting project using React 19 and tailwind with 2-navigation links and some server functions that write to a file.

# Development

```
pnpm drizzle-kit generate 
pnpm drizzle-kit migrate
pnpm tsx db/seed.ts

pnpm dev
```

# Local Production Build with CSS and Drizzle

```
pnpm drizzle-kit generate 
pnpm drizzle-kit migrate

pnpm build
```
### Just in case

If there is no css using the link how it is 
```
<link rel="stylesheet" href="/assets/ssr-DvDdi3ED.css"/>
``` 
run the script 
```
npx tailwindcss -i app/routes/main.css -o .output/public/assets/global.css --minify
```
change in the __root.tsx file in the `RootDocument` function to `<link rel="stylesheet" href="/assets/global.css"/>` 
and delete the other css file
```
node --env-file=.env .output/server/index.mjs
```



