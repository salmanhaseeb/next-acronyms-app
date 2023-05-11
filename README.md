This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Packages Used

1. For Fuzzy search, I have used Fuse.js
2. For environment handling, I have used dot-env.
3. For DB, I have used mongodb

## Private Keys

Private keys are kept in .env.local and pushed to github so that everyone can test.


## Structure and Design Patterns

I have used service object design patterns while conforming to NEXT JS best practices. It is an api only application that can be accessed as

For example: 

`http://localhost:3000/api/acronyms?from=50&limit=10&search=sole`

## See it in Action

https://www.loom.com/share/c40debefcc634a2c8d07b9a72f932b54

