appname='docker-manager'
host='162.222.215.235'
ssh_port=6322

yarn build:prod

rm -rf /Users/kdaxrobot/go/src/docker-manager/views/static/
cp -r ./dist/** /Users/kdaxrobot/go/src/docker-manager/views/

#
# scp -P $ssh_port -r ./dist/** root@$host:/data/app/${appname}/views
