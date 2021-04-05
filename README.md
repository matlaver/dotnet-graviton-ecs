# dotnet-graviton-ecs


### Instructions

1. Create a t4g.small instance with 64-bit (arm) selected, instantiate with the following User Data script: 


```bash
#!/bin/bash

# Install .NET 5 SDK
yum update -y
yum -y install libicu60
su ec2-user -c 'curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin -c 5.0'
echo export PATH="$PATH:/home/ec2-user/.dotnet" >> /etc/profile

# Install Node & AWS CDK
su - ec2-user -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash"
su - ec2-user -c "nvm install node"
su - ec2-user -c "npm install -g aws-cdk"

# Install git
yum install git -y

# Install Docker
amazon-linux-extras install docker
usermod -a -G docker ec2-user
reboot
```

2. Connect to the instance and start Docker 

```bash
service docker start
```

3. Clone this repository

```bash
git clone https://github.com/aws-samples/aws-cdk-examples.git
```

4. Build and run the CDK 