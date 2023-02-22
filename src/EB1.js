import React ,{ Component } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

let list =[];
export default class EB1 extends Component{
constructor(props){
    super(props);
    this.state = {
        dataOrg : [],
        list: []
    
    }
    
}
componentDidMount(){
    list = [] ; 
    this.setState({}); 
    axios.get("https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q=&facet=debutsemaine&facet=uai&refine.uai=0010001W").then((res)=>{
this.setState({dataOrg : res.data.records})
this.state.dataOrg.forEach((item,index)=>{
    let nb = 0 ; 
    let semaine  ;    
    Object.entries(item.fields).forEach(([key,value])=>{
        if(key ==="debutsemaine"){
            semaine = value ;
        }
        if(key.includes("visites")){
            if(!isNaN(value)) nb+=parseInt(value)
        }
    
    })
    list.push({somaine : semaine , nb : nb})
    

})
this.setState({list : list});
list.sort((a, b) =>{
    if (a.nb >b.nb)
       return -1;
    if (a.nb < b.nb )
       return 1;
    return 0;
  });
  
  console.log(list);
}
    ).catch((err)=>{

    })
}

    render(){

        return (<div>
<Alert variant="danger">
      <Alert.Heading>les 3 semaines ayant le plus grand nombre de visites sont coloré en rouge </Alert.Heading>
    
    </Alert>
            <Table>
            <thead>

        <tr>
          
          <th>Semaine</th>
          <th> Nb Visites </th>
        </tr>
        </thead>
        <tbody>
            
               {this.state.list.map((item,index)=>{
               
                return (
            <tr key={index} style={index<3 ? {color: 'red'} : {}}>
            <td>{item.somaine}</td>
            <td>{item.nb}</td>
            </tr>


                );
     } )}
</tbody>
            </Table>  
            </div>)
    }
}