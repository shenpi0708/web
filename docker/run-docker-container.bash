#!/bin/bash

# get parameter from system
user=iclab
work_dir=$(cd "$(dirname "$0")"; pwd)
# start sharing xhost
xhost +local:root

# run docker
docker run --rm \
  --net=host \
  --ipc=host \
  --privileged \
  -v /tmp/.X11-unix:/tmp/.X11-unix:rw \
  -v $HOME/.Xauthority:$docker/.Xauthority \
  -v ${work_dir}/../../..:/home/${user}/work \
  -e XAUTHORITY=$home_folder/.Xauthority \
  -e DISPLAY=$DISPLAY \
  -e QT_X11_NO_MITSHM=1 \
  -it --name "ros-noetic" ${user}/ros-focal-noetic
