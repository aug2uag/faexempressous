#!/bin/bash

if [ -z "$1" ]
  then
    echo 'name is required, for example:'
    echo '$ faexempressous app_name'
    exit 0
fi
SOURCEDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
mkdir $1
cd $1
DIRNAME="$PWD"
npm init
npm i browserify chalk eslint finalhandler jscs serve-static uglify-js uglifyify watchify --save-dev
npm i express famous body-parser cookie-parser morgan errorhandler --save
mkdir bin bin/routes public src
touch ./bin/server.js ./bin/index.js ./bin/error.js ./bin/http_error.js ./src/index.js ./src/Entry.js ./public/index.html
cat "$SOURCEDIR"/boilerplates/server_boiler.js >> ./bin/server.js
cat "$SOURCEDIR"/boilerplates/cluster_boiler.js >> ./bin/index.js
cat "$SOURCEDIR"/boilerplates/error_boiler.js >> ./bin/error.js
cat "$SOURCEDIR"/boilerplates/httperr_boiler.js >> ./bin/http_error.js
cat "$SOURCEDIR"/boilerplates/routes_boiler.js >> ./bin/routes/index.js
cat "$SOURCEDIR"/boilerplates/index_boiler.js >> ./src/index.js
cat "$SOURCEDIR"/boilerplates/entry_boiler.js >> ./src/Entry.js
cat "$SOURCEDIR"/boilerplates/index_boiler.html >> ./public/index.html
node "$SOURCEDIR"/script.js -n "$DIRNAME"
exit 0