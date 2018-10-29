#!/bin/bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

if ! [ -x "$(command -v docker)" ]; then
    echo "Docker is not installed. Please install Docker"
    exit 1
fi

echo "Preparing directory"
touch total-recall.sqlite

echo "Grabbing the latest release from Dockerhub. This may take a while..."
# sudo docker build -t total-recall .
sudo docker pull darkenvy/total-recall

echo "Running Docker container from prebuilt image."
sudo docker run \
  -dit \
  -p 7100:7100 \
  -v $(pwd)/decks/:/TotalRecall/server/decks/ \
  -v $(pwd)/total-recall.sqlite:/TotalRecall/server/flashy.sqlite \
  total-recall:latest
