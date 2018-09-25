#!/usr/bin/env bash
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
OLD_TAG=`yarn version --non-interactive | sed -n -e 's/^info Current version: \(.*\)/\1/p'`

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
PURPLE='\033[1;35m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0;m' # No Color

BOLD='\033[0;1m'

# Files status checking
if [ ! -z "$(git status --porcelain)" ]
then
  echo ""
  echo -e "${RED}You still have some changes to commit, please commit or stash them before continuing${NC}"
  echo ""
  exit 0
fi

# Argument checking
if [ $# -eq 1 ]
then
    VERSION=$1
fi

if [ $# -eq 0 ]
then
    TO_RELEASE=`git log --pretty=format:"%s" ${OLD_TAG}..master | sed 's/^\(.*\)/    \1/'`

    echo ""
    echo "# Commits to release:"
    echo -e "${YELLOW}${TO_RELEASE}${NC}"
    echo ""

    echo "# Version can be:"
    echo "    major   Use this for breaking changes        (1.0.0 => 2.0.0)"
    echo "    minor   Use this for functionality upgrades  (1.0.0 => 1.1.0)"
    echo "    patch   Use this for minor fixes             (1.0.0 => 1.0.1)"
    echo "    exit    Exit the release process"
    echo ""

    echo "Your choice? "
    read VERSION
fi

if [ ${VERSION} == "exit" ]
then
    echo "Mokayyy !"
    exit 0
fi

if [ ${VERSION} != "major" ] && [ ${VERSION} != "minor" ] && [ ${VERSION} != "patch" ]
then
    echo ""
    echo -e "${RED}Version should be one of: major, minor or patch${NC}"
    echo ""
    exit 0
fi

# Start release

echo ""
echo -e "${BOLD}##-- Get last remote sources from master --##${NC}"
echo ""

git checkout master
git fetch
git rebase origin/master

echo ""
echo -e "${BOLD}##-- Building last sources from master --##${NC}"
echo ""

yarn build:prod

# Deploying as git tag on Github
NEW_TAG=`yarn version --new-version ${VERSION} --no-git-tag-version | sed -n -e 's/^info New version: \(.*\)/\1/p'`

echo ""
echo -e "${BOLD}##-- Upgrading Project version (${OLD_TAG} -> ${NEW_TAG}) --##${NC}"

# Create a commit for release
git add package.json
git commit -m "chore(): release new version ${NEW_TAG}"
git push origin master

echo ""
echo -e "${BOLD}##-- Deploying the Github tag --##${NC}"
echo ""
COMMITS=`git log --pretty=format:"%s" ${OLD_TAG}..master` # Get all commits to release (with the last one)

 # Add dist folder in tag
git add -f dist
git commit -m "chore(): generate files for version ${NEW_TAG}"
git tag ${NEW_TAG} -m "${COMMITS}"
git push origin ${NEW_TAG}

 # Removing commit for dist files
git reset --hard HEAD~1

# Deploy generated release
yarn deploy $NEW_TAG

# Go back to previous branch
git checkout $BRANCH