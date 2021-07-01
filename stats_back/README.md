# The Backend (stats_back)
This is the REST API written with [nodejs](https://nodejs.org/en/) and [express](https://expressjs.com/). 
It serves all info from the mongodb to be used for whatever (i.e. the frontend). This API is also used 
to catch and return the data when a new user logs in using Github.

### Endpoints
- `/callback`: used when the user returns from logging into GitHub (fetches/updates currently store stats)
- `/stats`: returns the current user's stats as stored in the DB (not necessarily up to date)
- `/svg/:gitId`: generates an svg that represents the currently stored information of a user in the database
(this also triggers a refetching of stats which can be noticed upon later accesses)
- *\[Deprecated\]* ~~`/update_token`: updates the current cookie store to contain the most up to date GitHub access token~~
- *\[Deprecated\]* ~~`/validate/[token]`: checks a passed token to see if it matches the current DB entry~~

### Example
This is my card as generated via this service (fetched at the `/svg/:gitId` endpoint)

<img src="https://api.mygitstats.com/svg/40807825"></img>


