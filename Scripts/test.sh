#!/bin/bash
# script to unzip a file 
# stop Python running
# copy new Python files in  -cp
# rerun Python codes with new files

set -e

cd ../../../..

echo "\n Unzipping a file... \n"
unzip github.zip #unzip the github.zip file 

echo "\n Replace files... \n"
mv ./robohomeApp ./robohomeApp.OLD
mv ./comp2014-master ./robohomeApp

echo "\n Killing the pid file...\n"
kill -INT `cat ./robohomeApp.OLD/web/Robohome/robohome/robohome.pid`

echo "\n Deleting files...\n"
rm -rf ./robohomeApp.OLD
rm -rf ./github.zip

echo "Restarting flask"
#python ./robohomeApp/web/Robohome/robohome/flaskServer.py
