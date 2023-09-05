appname='docker-manager'

yarn build


rm -rf $USER_HOME/GolandProjects/docker-manager/views/assets/
cp -r ./dist/** $USER_HOME/GolandProjects/docker-manager/views/

#
# scp -P $ssh_port -r ./dist/** root@$host:/data/app/${appname}/views
