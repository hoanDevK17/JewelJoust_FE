echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@167.99.127.237:/var/www/html/
echo "Done!"