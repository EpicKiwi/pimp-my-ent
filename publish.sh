#!/bin/bash
set -e

source version

mkdir -p artifacts

echo "Building for Firefox"
if [[ -z $MOZILLA_ISSUER || -z $MOZILLA_SECRET ]]; then
	echo 'No $MOZILLA_ISSUER and $MOZILLA_SECRET Trying to load .env'
	source .env
fi
./generate-manifest.sh firefox
web-ext sign --api-key "$MOZILLA_ISSUER" --api-secret "$MOZILLA_SECRET" --channel unlisted -s "src" -a "artifacts"

echo "Building for Chrome"
./generate-manifest.sh chrome
cd src && zip ../artifacts/pimp-my-ent-${VERSION}.zip *