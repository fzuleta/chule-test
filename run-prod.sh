echo "Resetting git"
git reset --hard
git pull --rebase

echo "npm install"
npm i
echo "npm and build"
npm run build

echo "docker compose build"
docker compose build
echo "docker compose up"
docker compose up -d

echo "running!"
