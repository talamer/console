#!/usr/bin/env bash

if  oc api-versions | grep -q 'devconsole.openshift.io'; then
   echo -e "\n\033[0;32m \xE2\x9C\x94 Devconsole Operator is already installed \033[0m\n"
else
  echo -e "Which openshift version are you running (Ex - 3.x, 4.x)?"
  read OPENSHIFT_VERSION
  case $OPENSHIFT_VERSION in
    3.x)
      echo -e "Running Openshift Version 3.x \n"
      echo -e "Installing OLM... \n"
      oc apply -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/upstream/quickstart/olm.yaml
      echo -e "\n Installing DevConsole Operator... \n"
      echo -e "\n Installing Catalog Source... \n"
      oc apply -f ./public/extend/devconsole/shared/yamls/catalog_source3.yaml
      echo -e "\n Waiting for 15s for catalog source to get installed before creating subscription \n"
      sleep 15s
      echo -e "\n Creating Subscription... \n"
      oc apply -f ./public/extend/devconsole/shared/yamls/subscription3.yaml
      ;;
    4.x)
      echo -e "Running Openshift Version 4.x \n"
      echo -e "\n Installing DevConsole Operator... \n"
      echo -e "\n Installing Catalog Source... \n"
      oc apply -f ./public/extend/devconsole/shared/yamls/catalog_source4.yaml
      echo -e "\n Waiting for 15s for catalog source to get installed before creating subscription \n"
      sleep 15s
      echo -e "\n Creating Subscription... \n"
      oc apply -f ./public/extend/devconsole/shared/yamls/subscription4.yaml
      ;;
    *)
      echo -e "We do not support the given version \n"
      ;;
  esac
fi
