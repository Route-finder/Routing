#!/bin/bash

# Install steps for setting up Node.js Environment on Ubuntu using NVM

# Install and setup NVM:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc

# List versions available and choose one to install
nvm remote-list

echo "This project is tested with the latest Fermium LTS"
read -P "Enter a Version to Install: " version

# Install chosen Node.js version
nvm install $version
