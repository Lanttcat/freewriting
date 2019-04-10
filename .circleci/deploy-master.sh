#!/usr/bin/env bash

USER=$REMOTE_NAME
HOST=$REMOTE_HOST
SRC=`pwd`"/build/"
des=~/test/

#rsync -vzrc ${SRC}  ${USER}@${HOST}:${des}

scp -r ${SRC} ${HOST}:${des}