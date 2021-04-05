import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'DotNetGravitonVpc', { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, 'DotNetGravitonCluster', { vpc });

    cluster.addCapacity("DefaultAutoScalingGroupCapacity",
      {
          instanceType: new ec2.InstanceType("c6g.2xlarge"),
          machineImage: ecs.EcsOptimizedImage.amazonLinux2(ecs.AmiHardwareType.ARM)
      });
  
    const ecsService = new ecs_patterns.ApplicationLoadBalancedEc2Service(this, "GravitonService", {
        cluster,
        memoryLimitMiB: 8192,
        taskImageOptions: {
            image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../', 'app')),
            environment: {
                DEPLOYED_DATE: Date.now().toLocaleString()
            }
        },
        desiredCount: 2
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: ecsService.loadBalancer.loadBalancerDnsName }); 
  }
}
