# See https://github.com/microsoft/vscode-dev-containers/tree/main/containers/javascript-node for reference

ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

# Install dependencies only when needed
ARG NODE_VERSION=20

# [Optional] If your app requires native dependencies, you can uncomment these lines
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends python3 build-essential \
#     && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set workdir and copy package metadata for faster npm install
WORKDIR /workspace

# Ensure node modules are owned by the node user
USER node
