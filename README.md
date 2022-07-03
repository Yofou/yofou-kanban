# Welcome to Yofou Kanban!

## [💫] Tech Used
- [Remix Docs](https://remix.run/docs)
- [Redux Docs](https://redux-toolkit.js.org/)
- [Framer motion Docs](https://www.framer.com/docs/animate-presence/)
- [Prisma Docs](https://www.prisma.io/docs/getting-started/quickstart)
- [Joi Docs](https://joi.dev/api/?v=17.6.0)


## [🔋] Development

From your terminal:

```sh
npm run dev
pnpm dev
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.

## [📒] Dir glossary
* `/app/components/{page,shared}/*.tsx` - This is where all my react components live, typically they're under the page's name directory inside of `/components`, however there is also `/shared` for shared
componnents among multiple pages

* `/app/lib/server/*.server.ts` - These are module that should only be imported server side only
* `/app/lib/store/*` - this is where my redux reducers live, with the `/index.ts` being the root state.
* `/app/lib/service/*.service.ts` - this is utilitiy functions for my remix api routes, they typically just talk to my data layer (prisma)
* `/app/lib/service/*.controller.ts` - this is abstracted business logic for my remix api routes methods (ie, post, put, del).

* `/app/validators/*.ts` - these are where joi validators live to validate most of the request objects that get sent to my remix api routes
* `/app/routes/**/*.tsx` - here are where all the remix resources / endpoints live

### Contribution PR's are welcome
