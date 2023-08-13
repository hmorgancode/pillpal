# PillPal


## Getting Started
`npm i`
`npm run dev`

-To develop with vercel, run these commands from top to bottom: THESE FROM TOP TO BOTTOM IF YOU JUST PULLED:",
  "vercel-install": "npm i -g vercel@latest",
  "vercel-login": "npx vercel login",
  "vercel-link": "npx vercel link",
  "vercel-sync-env": "npx vercel env pull .env.local",
-This app requires fontawesome for development. Move the value of NPM_RC from .env into a new .npmrc. Replace the '\n' with an actual newline.",

## Supabase (backend database stuff)
https://supabase.com/docs/guides/cli/local-development
- Install Docker, Git, and the Supabase CLI (https://supabase.com/docs/guides/resources/supabase-cli)
- `scoop update supabase` to update the Supabase CLI on Windows.
- `supabase login`
- `supabase link --project-ref abcdefghijklmnop`https://abcdefghijklmnop.supabase.co
- `supabase start` - once the docker container is running you'll get output containing your local Supabase credentials (`supabase status`)
- Use pgAdmin for operations on local or remote db, or SB Studio UI (`localhost:54323` by default).
  - Use SSL! (https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-ssl)
  - Any emails will go to Inbucket `http://localhost:54324/`
  - Local dash is (http://localhost:54323/project/default/auth/users)
- `supabase db reset` will recreate the local db from scratch, run all migrations under /supabase/migrations and then seed data with /supabase/seed.sql
- `supabase test db` runs the database tests. (obv, add more for new functionality and make sure everything passes before committing or deploying db changes)
- `supabase db diff --linked` will diff the remote db against the local db. Reset your db before running it.
  - If supabase is out of date, redundant diffs may appear.
  - Add `--file migration_name` to output the diff to a migration.
  - `supabase db diff --linked --file supabase_updates`
  - You need to do this to catch the local db up to prod, i.e. when you add extensions to the remote db, or supabase makes updates.
  - You can't run it if you have unpushed migrations in your local repo.
- `supabase db diff` will create a new migration representing all changes made to the local db since `supabase start`
   - `supabase db diff create_rich_text_table -f create_rich_text_table`
- Or you can create a new timestamped migration script with `supabase migration new create_rich_text_table` and add SQL directly.
- Deploy local migrations using `supabase db push`
   - Eventually deploy via Github Actions
- end with `supabase stop`. I have no idea how to get Docker to fully shut down and when I force quit it I have to restart to get it working again.

-On OSX:
`brew upgrade supabase`
`npx supabase stop`
`npx supabase start`

- supabase local development does not appear to have an email authentication loop. Enter a new email and a valid password and you get logged right in as a registered user.
  I assume this is for convenience, cus it'll make writing certain Playwright tests a lot easier.
- If you reset the db while logged in your session will get messy. Use the local dash (http://localhost:54323/project/default/auth/users) to send
  yourself a magic link / pw reset link, click that link through the local email bucket (http://localhost:54324/) and you should be able to logout, etc...
