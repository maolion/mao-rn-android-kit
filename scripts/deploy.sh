#!/bin/sh

echo "deploy starting..."

diff=$(git --no-pager diff)

if ! [ -z "$diff" ]
then 
    git status
    exit 1
fi

git add .

stash=$(git stash)
stashed="1"

if [ "$stash" == "No local changes to save" ]
then
    stashed="0"
fi

npm run build || exit 0

cp -r ./dist/** ./

if ! [ -z "$1" ]
then
    npm publish --tag $1
else 
    npm publish
fi

git clean -fd

if [ "$stashed" == "1" ]
then
    git stash pop
    git reset .
fi


