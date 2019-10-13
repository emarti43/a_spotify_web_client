# a_spotify_web_client
Desktop UI for spotify (work in progress)
## Installing on Local Machine
* you must install  node `12.8.0` (the one with hooks, also specified in `.nvmrc`)
* install the packages (`yarn install` or `npm install`)
you must create a project on the spotify dev portal to get id and secret for using the Spotify API
 * place these strings under the names `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_CLIENT_ID`in your `~/.bash_profile` or passing them as env vars to the programs (i don't know why you would but you can)

## Running the Server
* just run `node server.js` in the appropriate directory, and you're set
* please note that this only works currently on a local machine, as I haven't added an additional redirect url to authorize `localhost:8080`

