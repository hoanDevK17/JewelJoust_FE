echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@157.245.203.86:/var/www/html/
echo "Done!"