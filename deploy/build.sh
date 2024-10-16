appname='docker-manager'

yarn build

rm -rf $HOME/GolandProjects/docker-manager/views/assets/
cp -r ./dist/** $HOME/GolandProjects/docker-manager/views/

#
# scp -P $ssh_port -r ./dist/** root@$host:/data/app/${appname}/views
