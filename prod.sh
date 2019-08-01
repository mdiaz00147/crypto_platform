rm -rf dist/
npm run build
rsync -azP -e 'ssh -p2222' dist/* root@host1.asoftio.com:/usr/share/nginx/cryptobusinesscompany/prod/app/
