import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CodeBaseList } from '../components/codebases/codebaselist';


export class CodebasesPage extends React.PureComponent<CodebasesPageProps> {
  constructor(props) {
    super(props);
  }
 mockList = [{ apiVersion: '1', kind: 'NameSpace', metadata:{name:'Christian'}, name:'Christian', namespace:"kube-dns", buildType: "NodeJS", codebase:'https://www.github.com/openshift/console', port:3000 }, 
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Nimisha'}, name:'Nimisha', namespace:"kube-proxy", buildType: "React", codebase:'https://www.github.com/openshift/console', port:8080 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Joshua'}, name:'Joshua', namespace:"kube-proxy", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:7001 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Steve'}, name:'Steve', namespace:"kube-dns", buildType: "GoLang", codebase:'https://www.github.com/openshift/console', port:3000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Adi'}, name:'Adi', namespace:"kube-proxy", buildType: "Java", codebase:'https://www.github.com/openshift/console', port:6000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Debsmita'}, name:'Debsmita', namespace:"myproject", buildType: "React", codebase:'https://www.github.com/openshift/console', port:3000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Rohit'}, name:'Rohit', namespace:"myproject", buildType: "Flutter", codebase:'https://www.github.com/openshift/console', port:8080 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Sahil'}, name:'Sahil', namespace:"kube-proxy", buildType: "Flutter", codebase:'https://www.github.com/openshift/console', port:80 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Vikram'}, name:'Vikram', namespace:"kube-proxy", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:4000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Divyanshi'}, name:'Divyanshi', namespace:"openshift", buildType: "NodeJS", codebase:'https://www.github.com/openshift/console', port:7001 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Karthik'}, name:'Karthik', namespace:"myproject", buildType: "GoLang", codebase:'https://www.github.com/openshift/console', port:6000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Dholiak'}, name:'Dholiak', namespace:"openshift", buildType: "Java", codebase:'https://www.github.com/openshift/console', port:7001 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Baiju'}, name:'Baiju', namespace:"openshift", buildType: "Python", codebase:'https://www.github.com/openshift/console', port:8080 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Ibrahim'}, name:'Ibrahim', namespace:"openshift", buildType: "Python", codebase:'https://www.github.com/openshift/console', port:7200 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Harpreet'}, name:'Harpreet', namespace:"kube-dns", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:3000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Serena'}, name:'Serena', namespace:"kube-proxy", buildType: "GoLang", codebase:'https://www.github.com/openshift/console', port:80 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Shoubhik'}, name:'Shoubhik', namespace:"kube-proxy", buildType: "NodeJS", codebase:'https://www.github.com/openshift/console', port:4001 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Saravana'}, name:'Saravana', namespace:"myproject", buildType: "React", codebase:'https://www.github.com/openshift/console', port:8080 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Anji'}, name:'Anji', namespace:"kube-proxy", buildType: "Angular", codebase:'https://www.github.com/openshift/console', port:7001 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Vidhya'}, name:'Vidhya', namespace:"kube-proxy", buildType: "Flutter", codebase:'https://www.github.com/openshift/console', port:9000 },
              { apiVersion: '1', kind: 'NameSpace', metadata:{name:'Karuna'}, name:'Karuna', namespace:"kube-proxy", buildType: "React", codebase:'https://www.github.com/openshift/console', port:2001 },
  ];
  render() {  
   return(      
      <React.Fragment>
        <Helmet>
          <title>Codebases</title>
        </Helmet>
        <div className="codebase__container">
        <CodeBaseList list={this.mockList} namespace={this.props.namespace}></CodeBaseList>
        </div>  
      </React.Fragment>
    )
   }
 }

 export default CodebasesPage;

 interface CodebasesPageProps {
  namespace: string,
 }



