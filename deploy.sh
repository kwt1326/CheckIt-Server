git pull
npm install
npm run build
pm2 start npm -w -i 0 --name "prod" -- start