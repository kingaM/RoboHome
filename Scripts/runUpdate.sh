#!/bin/bash
# script to unzip a file 
# stop Python running
# copy new Python files in  -cp
# rerun Python codes with new files

set -e

mv github.zip ../../../github.zip

cd ../../..

echo "\n Unzipping a file... \n"
unzip github.zip #unzip the github.zip file 

echo "\n Killing the pid file...\n"
kill -INT `cat ./web/Robohome/robohome/robohome.pid`

echo "\n Delete previous backup...\n"
rm -rf ./webOLD

echo "\n Replace files... \n"
mv ./web ./webOLD
mv ./comp2014-master/web ./web

echo "\n Deleting files...\n"
rm -rf ./github.zip
rm -rf ./comp2014-master

echo "Restarting flask"
python ./web/Robohome/robohome/flaskServer.py
