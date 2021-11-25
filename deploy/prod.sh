docker run --rm \
  -v `pwd`/src:/app/src \
  -v `pwd`/dist:/app/dist \
  -v `pwd`/static:/app/static \
  -v `pwd`/config:/app/config \
  -v `pwd`/build:/app/build \
  -v `pwd`/gulpfile.js:/app/gulpfile.js \
  -v `pwd`/.postcssrc.js:/app/.postcssrc.js \
  -v `pwd`/index.html:/app/index.html \
 docker-manager-page:latest npm run build
