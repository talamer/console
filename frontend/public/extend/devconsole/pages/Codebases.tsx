import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CodeBaseList } from '../components/codebases/codebaselist';


const CodebasesPage: React.SFC<CodebasesPageProps> = (props) => {

 const mockList = [{ name:'Christian', namespace:"kube-dns", buildType: "NodeJS", codebase:'https://www.github.com/openshift/console', port:3000 }, 
              { name:'Nimisha', namespace:"kube-proxy", buildType: "React", codebase:'https://www.github.com/openshift/console', port:8080 },
              { name:'Joshua', namespace:"kube-proxy", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:7001 },
              { name:'Steve', namespace:"kube-dns", buildType: "GoLang", codebase:'https://www.github.com/openshift/console', port:3000 },
              { name:'Adi', namespace:"kube-proxy", buildType: "Java", codebase:'https://www.github.com/openshift/console', port:6000 },
              { name:'Debsmita', namespace:"myproject", buildType: "React", codebase:'https://www.github.com/openshift/console', port:3000 },
              { name:'Rohit', namespace:"myproject", buildType: "Flutter", codebase:'https://www.github.com/openshift/console', port:8080 },
              { name:'Sahil', namespace:"kube-proxy", buildType: "Flutter", codebase:'https://www.github.com/openshift/console', port:80 },
              { name:'Vikram', namespace:"kube-proxy", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:4000 },
              { name:'Divyanshi', namespace:"openshift", buildType: "NodeJS", codebase:'https://www.github.com/openshift/console', port:7001 },
              { name:'Karthik', namespace:"myproject", buildType: "GoLang", codebase:'https://www.github.com/openshift/console', port:6000 },
              { name:'Dholiak', namespace:"openshift", buildType: "Java", codebase:'https://www.github.com/openshift/console', port:7001 },
              { name:'Baiju', namespace:"openshift", buildType: "Python", codebase:'https://www.github.com/openshift/console', port:8080 },
              { name:'Ibrahim', namespace:"openshift", buildType: "Python", codebase:'https://www.github.com/openshift/console', port:7200 },
              { name:'Harpreet', namespace:"kube-dns", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:3000 },
              { name:'Serena', namespace:"kube-proxy", buildType: "GoLang", codebase:'https://www.github.com/openshift/console', port:80 },
              { name:'Shoubhik', namespace:"kube-proxy", buildType: "NodeJS", codebase:'https://www.github.com/openshift/console', port:4001 },
              { name:'Saravana', namespace:"myproject", buildType: "React", codebase:'https://www.github.com/openshift/console', port:8080 },
              { name:'Anji', namespace:"kube-proxy", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:7001 },
              { name:'Vidhya', namespace:"kube-proxy", buildType: "Flutter", codebase:'https://www.github.com/openshift/console', port:9000 },
              { name:'Karuna', namespace:"kube-proxy", buildType: "React", codebase:'https://www.github.com/openshift/console', port:2001 },
  ];
    
   return(      
      <React.Fragment>
        <Helmet>
          <title>Codebases</title>
        </Helmet>
        <div className="codeBaseContainer">
        <CodeBaseList list={mockList} namespace={props.namespace}></CodeBaseList>
        </div>  
      </React.Fragment>
    )
 }

 export default CodebasesPage;

 interface CodebasesPageProps {
  namespace: string,
 }



