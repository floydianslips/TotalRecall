#!/bin/bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

if ! [ -x "$(command -v docker)" ]; then
    echo "Docker is not installed. Please install Docker"
    exit 1
fi

echo "Attempting to stop the last docker container with the tag total-recall"

sudo docker stop `docker ps -a -q --filter ancestor=total-recall`

if [ $? -eq 0 ];then
   echo "Successfully stopped the total-recall container!"
else
   echo "Unsuccessful Stopping of the container."
fi