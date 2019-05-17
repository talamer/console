oc delete -f base.yaml
oc delete -f resources.yaml
oc create -f base.yaml
echo ==    - -    PLEASE BE PATIENT!!  - -    ==
sleep 10
oc create -f resources.yaml
sleep 1
oc create -f task.yaml
sleep 1
oc create -f pipeline.yaml
sleep 5
oc create -f pipelinerun.yaml
echo ==   D E V  -  C 0 N S 0 L E  -  U I   ==
sleep 3
