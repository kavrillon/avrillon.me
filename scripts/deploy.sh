#!/usr/bin/env bash
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ ! -z "$(git status --porcelain)" ]
then
  echo ""
  echo "You have still some changes to commit, please commit or stash them before continuing"
  echo ""
  exit 0
fi

if [ $# -eq 0 ]
then
    echo ""
    echo "usage: deploy.sh <tag>"
    echo ""
    exit 0
fi

tag=$1

echo ""
echo "##-- Get last remote sources from $tag --##"

git checkout $tag
git fetch
git rebase $tag

echo ""
echo "##-- Building last sources from $tag --##"

yarn build:prod

echo ""
echo "##-- Deploying on Github Pages --##"

git branch --delete --force gh-pages
git checkout --orphan gh-pages
git add -f dist
git commit -m "GitHub Pages Deployment: $tag"
git filter-branch -f --prune-empty --subdirectory-filter dist && git push -f origin gh-pages && git checkout -
git checkout $branch