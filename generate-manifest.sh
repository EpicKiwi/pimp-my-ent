#!/bin/bash
set -e

if [[ -z $1 ]]; then
	echo "Usage : generate-manifest.sh [chrome|firefox]"
	exit 1
fi

source version

export VERSION=$VERSION

envsubst < "src/manifest.$1.json" > "src/manifest.json"

echo "Manifest for $1 generated in src/manifest.json"