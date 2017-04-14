#!/bin/sh

rm -rf ./dist

tsc -d

target=./example/node_modules/mao-rn-android-kit
rm -rf $target
cp -r ./dist $target
ln -s ../../../android $target/android
ln -s ../../../package.json $target/package.json
