#!/bin/bash

## Update the shenbag in the dist/index.js file

FILE="dist/index.js"

if [[ -f "$FILE" ]]; then
  cp "$FILE" "$FILE.bak"

  if sed -i.bak '1s|#!/usr/bin/env tsx|#!/usr/bin/env node|' "$FILE"; then
    chmod 755 "$FILE"
    echo "Shebang line replaced successfully in $FILE and permissions set to 755."
    rm "$FILE.bak" 
  else
    echo "Error replacing shebang line. Restoring from backup."
    mv "$FILE.bak" "$FILE"
  fi
else
  echo "File $FILE does not exist."
fi
