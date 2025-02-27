import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
 auth,
 data,
});

const translateDataSource = backend.data.addHttpDataSource(
 "TranslateDataSource",
 `https://translate.${backend.data.stack.region}.amazonaws.com`,
 {
   authorizationConfig: {
     signingRegion: backend.data.stack.region,
     signingServiceName: "translate",
   },
 }
);

translateDataSource.grantPrincipal.addToPrincipalPolicy(
 new PolicyStatement({
   actions: ["translate:TranslateText"],
   resources: ["*"],
 })
);