oc delete pipelines --all
oc delete pipelineruns --all
oc delete tasks --all
oc delete taskruns --all
oc create -f base.yaml 
oc create -f resources.yaml
