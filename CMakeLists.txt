cmake_minimum_required(VERSION 3.0.2)
project(roswebnode)

find_package(catkin REQUIRED)

###################################
## catkin specific configuration ##
###################################
catkin_package()

#############
## Install ##
#############

install(PROGRAMS
   web/node/app.js

   DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)
