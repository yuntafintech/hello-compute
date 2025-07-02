#!/bin/bash
# This script runs when you hit the Publish button!

printf '🚨 This action will deploy a Compute app to your Fastly account – do you want to proceed? (y/n)? '
read answer

if [ "$answer" != "${answer#[Yy]}" ] ; then 
    if [ ! $FASTLY_API_TOKEN ]; then 
        echo '⚠️ Grab an API key and add it your repo before deploying! Check out the README for steps. 📖' 
    else 
        npm run build
        npm run deploy || { echo 'Oops! Something went wrong deploying your app.. 🤬'; exit 1; }
        readarray -t lines < <(npm run domain)
        IFS='   ' read -r -a array <<< "${lines[1]}"
        printf "\nWoohoo check out your site at https://${array[2]} 🪩 🛼 🎏\n\n"
    fi
else
    exit 1
fi
