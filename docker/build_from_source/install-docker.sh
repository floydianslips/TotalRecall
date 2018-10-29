#!/bin/bash

if [ -x "$(command -v docker)" ]; then
    echo "You already have docker. No need to install!"
    exit 1
fi

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi


if [[ "$@" == "--continue" ]]
then
  echo "Installing Docker on the Raspberry Pi"
  curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh
else

  echo ""
  echo "███╗   ██╗ ██████╗ ████████╗██╗ ██████╗███████╗"
  echo "████╗  ██║██╔═══██╗╚══██╔══╝██║██╔════╝██╔════╝"
  echo "██╔██╗ ██║██║   ██║   ██║   ██║██║     █████╗  "
  echo "██║╚██╗██║██║   ██║   ██║   ██║██║     ██╔══╝  "
  echo "██║ ╚████║╚██████╔╝   ██║   ██║╚██████╗███████╗"
  echo "╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝╚══════╝"
  echo ""                                           

  echo "This will install docker using curl. This method was provided by freecodecamp.org's blog and has not been personally tested by Darkenvy. To proceed with the installation, run this command again with the --continue flag."
  echo ""
  echo "https://medium.freecodecamp.org/the-easy-way-to-set-up-docker-on-a-raspberry-pi-7d24ced073ef"
fi
