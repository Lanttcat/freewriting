#!/usr/bin/env bash

user=$REMOTE_NAME
host=$REMOTE_HOST
src=`pwd`"/build/"
des=~/test/
now=`date +"%Y-%m-%d %H:%M:%S"`

rsync -vzrc $src  $user@$host:$des
