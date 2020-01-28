echo "Pulling changes"
git pull
echo "Stopping recipe-manager container"
docker stop recipe-manager
echo "Remove recipe-manager container"
docker rm recipe-manager
echo "Build the new recipe-manager docker image"
docker build -t root/recipe-manager-image .
echo "Running the new recipe-manager container"
docker run --name recipe-manager --restart always -p 38120:8002 -d root/recipe-manager-image -v $HOME/user/temp/recipes/public/images/uploads:/public/images/uploads
echo ""

echo "Complete"
echo ""