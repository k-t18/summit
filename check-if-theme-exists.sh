!/bin/sh

# echo "I ran successfully"

# Check if the components folder exists
if [ -d "components" ]; then
  # Return with success status code (0) if the folder exists
  exit 0
else
  # Return failure status code (1) if the folder does not exist
  exit 1
fi