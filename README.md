# Expanse Tracker

Lightweight local web app to track expenses and view a modern dashboard. Data is stored in your browser's `localStorage` (no server required).

Quick start

1. Install dependencies:

```bash
cd "c:\Users\HP\Desktop\expanse tracker"
npm install
```

2. Start dev server:

```bash
npm run dev
```

Open the provided localhost URL in your browser. Add expenses in the left panel and view totals and recent items in the dashboard.

Currency

- The app now formats currency in Indian Rupees (INR / ₹).

Export / Import CSV

- Use the "Export CSV" button on the dashboard to download your expenses as a CSV file.
- Use "Import CSV" to upload previously exported files (columns: id,type,date,amount,paid,balance).

Hosting (make it available from anywhere)

This is a static frontend app and can be hosted on GitHub Pages, Netlify or Vercel. Basic steps:

1. Build the production bundle:

```bash
npm run build
```

2. Deploy options:

- GitHub Pages: Create a repository, push the project, then in the repo's GitHub Pages settings set the deployment source to the `gh-pages` branch or the `docs/` folder. You can use the `gh-pages` npm package to publish the `dist` folder.

- Netlify: Drag & drop the `dist` folder into Netlify's deploy UI, or connect your Git repository and set the build command to `npm run build` and the publish directory to `dist`.

- Vercel: Install the Vercel CLI or connect your Git repository to Vercel. Set the build command to `npm run build` and the output directory to `dist`.

After deployment you'll get a public URL which you can open on your mobile device.

Vercel & Netlify (recommended)

Both services provide a simple way to deploy this static app with automatic builds from a Git repository or via CLI. Below are quick CLI options and dashboard flow notes.

Quick CLI deploy (Vercel)

```bash
# install Vercel CLI (one-time)
npm install -g vercel

# login (opens browser)
vercel login

# from project root - first deploy will ask a few questions, use defaults; to push a production deploy:
vercel --prod
```

Quick CLI deploy (Netlify)

```bash
# install Netlify CLI (one-time)
npm install -g netlify-cli

# login (opens browser)
netlify login

# build the site first
npm run build

# deploy the `dist` directory to Netlify (interactive first time)
netlify deploy --dir=dist

# to create a production deploy after the first interactive setup:
netlify deploy --prod --dir=dist
```

Dashboard deployment (recommended for Git-backed projects)

- Push your project to a Git provider (GitHub/GitLab/Bitbucket).
- Connect the repo in the Vercel or Netlify dashboard.
- Set the build command to `npm run build` and the publish directory to `dist`.
- Each push will create preview URLs and production deployments automatically.

Files added for deployment

- `vercel.json`: config to let Vercel build and serve the SPA from `dist`.
- `netlify.toml`: config to tell Netlify where to publish and which build command to run.

If you want, I can initialize a Git repo here, make an initial commit, and (optionally) connect/push to GitHub for you — would you like me to do that? 
