#!/bin/sh

echo "deploying ..."
rm -rf ./dist

echo "building ..."
npm run build || exit 0

echo "copying ..."
target=./example/node_modules/mao-rn-android-kit
rm -rf $target
cp -r ./dist $target
ln -s ../../../android $target/android
ln -s ../../../package.json $target/package.json