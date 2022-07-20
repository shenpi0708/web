sudo apt update
rosdep update
cd rvizweb_ws
rosdep install --from-paths src --ignore-src -r -y
. /opt/ros/noetic/setup.sh && catkin_make install
