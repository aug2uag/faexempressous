#!/bin/bash

if [ -z "$1" ]
  then
    echo 'name is required:'
    echo 'faexempressous app_name'
    exit 0
fi
mkdir $1
cd $1
npm init
npm i browserify chalk eslint finalhandler jscs serve-static uglify-js uglifyify watchify --save-dev
npm i express famous body-parser cookie-parser morgan errorhandler --save
mkdir bin bin/routes public src
touch ./bin/server.js ./bin/index.js ./bin/error.js ./bin/http_error.js ./src/index.js ./src/Entry.js ./public/index.html
cat ../boilerplates/server_boiler.js >> ./bin/server.js
cat ../boilerplates/cluster_boiler.js >> ./bin/index.js
cat ../boilerplates/error_boiler.js >> ./bin/error.js
cat ../boilerplates/httperr_boiler.js >> ./bin/http_error.js
cat ../boilerplates/routes_boiler.js >> ./bin/routes/index.js
cat ../boilerplates/index_boiler.js >> ./src/index.js
cat ../boilerplates/entry_boiler.js >> ./src/Entry.js
cat ../boilerplates/index_boiler.html >> ./public/index.html
cd ..
node script.js -n $1
exit 0