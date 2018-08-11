#!/usr/bin/env bash
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ ! -z "$(git status --porcelain)" ]
then
  echo ""
  echo "You have still some changes to commit, please commit or stash them before continuing"
  echo ""
  exit 0
fi

echo ""
echo "##-- Get last remote sources from $branch --##"

git checkout $branch
git fetch
git rebase $branch

echo ""
echo "##-- Building last sources from $branch --##"

yarn build:prod

echo ""
echo "##-- Deploying on Github Pages --##"

git branch --delete --force gh-pages
git checkout --orphan gh-pages
git add -f dist
git commit -m "Rebuild GitHub pages"
git filter-branch -f --prune-empty --subdirectory-filter dist && git push -f origin gh-pages && git checkout -
git checkout $branch