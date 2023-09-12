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

## Flow

1. Github service account with committed personal access token
   (scoped to create issues only).
2. Call Github API via app, generating issues containing an SQL
   dump of the data a user added.
3. Issues are in a standardised format, triggering a PR via Github
   workflow to append the SQL to a `changes.txt` document.
4. Approved PRs merge in the SQL into `changes.txt`.
5. The changes file is executed on the SQLite DB monthly, and changes file wiped.
