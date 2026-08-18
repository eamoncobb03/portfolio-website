# eamoncobb.com

Personal site for Eamon Cobb, data analyst based in Ottawa. It covers my
background, work history, and skills, and links out to projects as I build
them.

Built with React, Vite, and Tailwind. Hosted on Vercel.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Editing content

Text like job history, bio, and links lives in `src/content.js`. That includes
the hero card, which turns into a link to the project once its `href` is set.

## Projects

`/investmentplanner` is rewritten in `vercel.json` to a separate deployment,
so that path is served by its own project rather than this one.
