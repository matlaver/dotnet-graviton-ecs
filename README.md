# dotnet-graviton-ecs

#!/bin/bash
yum update -y
yum -y install libicu60
su ec2-user -c 'curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin -c 5.0'
echo export PATH="$PATH:/home/ec2-user/.dotnet" >> /etc/profile

# Install Node
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
# install node (and npm) with yum
yum -y install nodejs
npm i cross-env -g

npm install -g aws-cdk

amazon-linux-extras install docker
service docker start
usermod -a -G docker ec2-user
reboot