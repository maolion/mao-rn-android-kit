#!/bin/sh

echo "deploying ..."

echo "cleaning previouse build files ..."
rm -rf ./dist

echo "building ..."
npm run build || exit 0

echo "copying ..."
mkdir ./dist/android
cp -r ./android/src ./dist/android/src
cp ./android/build.gradle ./dist/android/build.gradle

cp ./package.json ./dist/package.json

perl -pi -w -e 's/"prepublish": "exit 1"/"prepublish": ""/g;' ./dist/package.json

cd ./dist

echo "publishing ..."

if ! [ -z "$1" ]
then
    npm publish --tag $1
else
    npm publish
fi