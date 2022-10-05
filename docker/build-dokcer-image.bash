#!/bin/bash

file_dir=`dirname $0`

# get parameter from system
user=iclab
group=`id -gn`
uid=`id -u`
gid=`id -g`

# build docker images
docker build -t ${user}/ros-focal-noetic \
    --build-arg USER=${user} \
    --build-arg UID=${uid} \
    --build-arg GROUP=${group} \
    --build-arg GID=${gid} \
    ${file_dir}

# docker build -t ${user}/ros-focal-noetic \
#     --build-arg USER=${user} \
#     --build-arg UID=${uid} \
#     --build-arg GROUP=${group} \
#     --build-arg GID=${gid} \
#     ${file_dir}/Dockerfile ${file_dir}/..

