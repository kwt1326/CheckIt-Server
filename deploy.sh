git pull
npm install
npm run build
pm2 delete 0
pm2 start npm -w -i 1 --name "prod" -- start