

cd themes || exit

# Clone the theme repository
git clone https://github.com/summit-webapp-themes/demo-theme.git

cd demo-theme || exit

# Run the install script
/bin/bash install-theme.sh

# Navigate back to summit folder
cd ../.. || exit


# install dependencies
npm install

echo -e "🎉 You have successfully setup Summit 🎉\n\nWe have installed demo-theme for you. In case if you want to change the theme, remove demo-theme folder from themes folder and clone the other theme repository.\n\n\nRun "npm run start-summit" to start the development server.\n\n"
