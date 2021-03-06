#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# create empty repo and commit all changes
git init
git add -A
git commit -m 'Deploy.'

# overwrite the gh-pages branch
git push -f git@github.com:frankkulak/research-db.git master:gh-pages

# navigate back
cd -