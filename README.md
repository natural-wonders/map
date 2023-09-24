# Natural Wonders Map

View the world's natural wonders on a map.

## Goal

- To host an entirely offline-first frontend, without the need for any backend.
- The SQLite DB is accessed entirely in the browser via WASM.
- User contributions are sent via the app, triggering an issue on the repo.
- Pull requests are triggered from the issue,
  verified, and included in the next version of the DB.

## Contribution

- The data used in this app has been entirely curated by me (around 2018).
- Contributions to the data quality are welcomed.
- Submissions can be made via the app, then should be bundled in the next release.

## Adding New Wonders in Gitlab (via the app)

1. Github service account with committed personal access token
   (scoped with actions:write only).
2. Call Github API via app, triggering workflow_dispatch webhook, and including SQL
   INSERT statement (with user data) as an input.
3. A Github workflow runs to create a PR, adding the SQL INSERT statement to changes.sql.
4. Once reviewed, merging the PR triggers another Github workflow,
   that actually runs the SQL statement
   on the SQLite file, and pushes the updated file back to the repo.

## Offline First Database

- On first load the user downloads the SQLite file from the repo (if it doesn't exist).
- The database is persisted in OPFS in the browser.
- When the user creates a new wonder,
  it is appended to a `changes.sqlite3` file, also in OPFS.
  This allows the user to see their edit, despite it not being merged yet.
- There is a 'refresh' button in the app.
  When the user clicks this, the main SQLite DB is re-downloaded.
  The `changes.sqlite3` and the main DB are compared, and if the wonder is now included
  in the main DB (i.e. it was merged in Gitlab),
  then the record is deleted from `changes.sqlite3`.
