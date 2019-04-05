#!/usr/bin/env bash

DEVCONSOLE_OPERATORS_INSTALLED=$(oc get csv --output=json | jq '[.items | .[].metadata.name  | contains("devconsole")] | any')

if  $DEVCONSOLE_OPERATORS_INSTALLED
then
   echo -e "\n\033[0;32m \xE2\x9C\x94 Devconsole Operator is already installed \033[0m\n"
else

   echo -e "Installing OLM... \n"
   oc create -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/upstream/quickstart/olm.yaml
   echo -e "\n Installing DevConsole Operator... \n"
   oc create -f http://operator-hub-shbose-preview1-stage.b542.starter-us-east-2a.openshiftapps.com/install/devconsole.v0.1.0.yaml

fi
