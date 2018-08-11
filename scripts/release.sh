#!/usr/bin/env bash
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Files status checking
if [ ! -z "$(git status --porcelain)" ]
then
  echo ""
  echo "You still have some changes to commit, please commit or stash them before continuing"
  echo ""
  exit 0
fi

# Argument checking
if [ $# -eq 0 ]
then
    echo ""
    echo "usage: release.sh <version>"
    echo ""
    echo "Version can be:"
    echo "    major   Use this for breaking changes        (1.0.0 => 2.0.0)"
    echo "    minor   Use this for functionality upgrades  (1.0.0 => 1.1.0)"
    echo "    patch   Use this for minor fixes             (1.0.0 => 1.0.1)"
    echo ""
    exit 0
fi

if [ $1 != "major" ] && [ $1 != "minor" ] && [ $1 != "patch" ]
then
    echo ""
    echo "Version should be one of: major, minor or patch"
    echo ""
    exit 0
fi

# Start release

echo ""
echo "##-- Get last remote sources from master --##"

git checkout master
git fetch
git rebase origin/master

echo ""
echo "##-- Building last sources from master --##"

yarn build:prod

# Deploying as git tag on Github

echo ""
echo "##-- Upgrading Project version --##"
tag=`yarn --no-git-tag-version version $1`

git add package.json
git commit -m "chore(): release new version ${tag}"
git push origin master

echo ""
echo "##-- Deploying on Github tag --##"
git add -f dist

git commit -m "chore(): generate files for version ${tag}"
git tag ${tag}

git push origin ${tag}
git reset --hard HEAD~1

# Deploy generated release
yarn deploy $tag

# Go back to previous branch
git checkout $branch