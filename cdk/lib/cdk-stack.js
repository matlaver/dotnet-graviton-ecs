"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStack = void 0;
const cdk = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
const path = require("path");
class CdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = new ec2.Vpc(this, 'DotNetGravitonVpc', { maxAzs: 2 });
        const cluster = new ecs.Cluster(this, 'DotNetGravitonCluster', { vpc });
        cluster.addCapacity("DefaultAutoScalingGroupCapacity", {
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
            desiredCount: 1
        });
        new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: ecsService.loadBalancer.loadBalancerDnsName });
    }
}
exports.CdkStack = CdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLDBEQUEwRDtBQUMxRCw2QkFBNkI7QUFFN0IsTUFBYSxRQUFTLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDckMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFeEUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxpQ0FBaUMsRUFDbkQ7WUFDSSxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUNqRCxZQUFZLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztTQUM1RSxDQUFDLENBQUM7UUFFTCxNQUFNLFVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDM0YsT0FBTztZQUNQLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGdCQUFnQixFQUFFO2dCQUNkLEtBQUssRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzFFLFdBQVcsRUFBRTtvQkFDVCxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRTtpQkFDN0M7YUFDSjtZQUNELFlBQVksRUFBRSxDQUFDO1NBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFFckcsQ0FBQztDQUNGO0FBN0JELDRCQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tIFwiQGF3cy1jZGsvYXdzLWVjMlwiO1xuaW1wb3J0ICogYXMgZWNzIGZyb20gJ0Bhd3MtY2RrL2F3cy1lY3MnO1xuaW1wb3J0ICogYXMgZWNzX3BhdHRlcm5zIGZyb20gJ0Bhd3MtY2RrL2F3cy1lY3MtcGF0dGVybnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNsYXNzIENka1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHRoaXMsICdEb3ROZXRHcmF2aXRvblZwYycsIHsgbWF4QXpzOiAyIH0pO1xuXG4gICAgY29uc3QgY2x1c3RlciA9IG5ldyBlY3MuQ2x1c3Rlcih0aGlzLCAnRG90TmV0R3Jhdml0b25DbHVzdGVyJywgeyB2cGMgfSk7XG5cbiAgICBjbHVzdGVyLmFkZENhcGFjaXR5KFwiRGVmYXVsdEF1dG9TY2FsaW5nR3JvdXBDYXBhY2l0eVwiLFxuICAgICAge1xuICAgICAgICAgIGluc3RhbmNlVHlwZTogbmV3IGVjMi5JbnN0YW5jZVR5cGUoXCJjNmcuMnhsYXJnZVwiKSxcbiAgICAgICAgICBtYWNoaW5lSW1hZ2U6IGVjcy5FY3NPcHRpbWl6ZWRJbWFnZS5hbWF6b25MaW51eDIoZWNzLkFtaUhhcmR3YXJlVHlwZS5BUk0pXG4gICAgICB9KTtcbiAgXG4gICAgY29uc3QgZWNzU2VydmljZSA9IG5ldyBlY3NfcGF0dGVybnMuQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRFYzJTZXJ2aWNlKHRoaXMsIFwiR3Jhdml0b25TZXJ2aWNlXCIsIHtcbiAgICAgICAgY2x1c3RlcixcbiAgICAgICAgbWVtb3J5TGltaXRNaUI6IDgxOTIsXG4gICAgICAgIHRhc2tJbWFnZU9wdGlvbnM6IHtcbiAgICAgICAgICAgIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi8nLCAnYXBwJykpLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAgICAgICBERVBMT1lFRF9EQVRFOiBEYXRlLm5vdygpLnRvTG9jYWxlU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVzaXJlZENvdW50OiAxXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnTG9hZEJhbGFuY2VyRE5TJywgeyB2YWx1ZTogZWNzU2VydmljZS5sb2FkQmFsYW5jZXIubG9hZEJhbGFuY2VyRG5zTmFtZSB9KTtcbiAgXG4gIH1cbn1cbiJdfQ==