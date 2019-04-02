#!/usr/bin/env bash

DEVCONSOLE_OPERATORS_INSTALLED=$(oc get pods --all-namespaces --output=json | jq '[.items | .[].metadata.name  | contains("devops")] | any')
DEVCONSOLE_CRDS_INSTALLED=$(oc get crds --output=json | jq '[.items | .[].metadata.name  | contains("gitsources.devopsconsole.openshift.io")] | any')

if  $DEVCONSOLE_OPERATORS_INSTALLED && $DEVCONSOLE_CRDS_INSTALLED
then
   echo -e "\n\033[0;32m \xE2\x9C\x94 Devconsole Operator and crds are already installed \033[0m\n"
else

   echo -e "Installing OLM... \n"
   oc create -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/upstream/quickstart/olm.yaml
   echo -e "\n Installing DevConsole Operator... \n"
   oc create -f http://operator-hub-shbose-preview1-stage.b542.starter-us-east-2a.openshiftapps.com/install/devopsconsole.v0.1.0.yaml

fi
