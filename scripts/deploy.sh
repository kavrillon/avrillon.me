#!/usr/bin/env bash
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
PURPLE='\033[1;35m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Files status checking
if [ ! -z "$(git status --porcelain)" ]
then
  echo ""
  echo -e "${RED}You still have some changes to commit, please commit or stash them before continuing${NC}"
  echo ""
  exit 0
fi

# Argument checking
if [ $# -eq 0 ]
then
    echo ""
    echo -e "${RED}usage: deploy.sh <tag>${NC}"
    echo ""
    exit 0
fi

# Get tag to deploy
TAG=$1

# Start deploying
echo ""
echo "##-- Get last remote sources from $TAG --##"

git checkout $TAG
git fetch
git rebase origin/$TAG

echo ""
echo "##-- Building last sources from $TAG --##"

yarn build:prod

echo ""
echo "##-- Deploying on Github Pages --##"

git branch --delete --force gh-pages
git checkout --orphan gh-pages
git add -f dist
git commit -m "GitHub Pages Deployment: $TAG"
git filter-branch -f --prune-empty --subdirectory-filter dist && git push -f origin gh-pages && git checkout -

# Go back to previous branch
git checkout $BRANCH