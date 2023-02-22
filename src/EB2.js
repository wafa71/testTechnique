import axios from "axios";
import React ,{   useState } from "react";

export default function EB2 (){
  
   const [data,setData]=useState({
    uai : "",
    year : ""
   })
   const [tab,setTab]= useState([]);

   function get(e) {
    console.log('Le lien a été cliqué.');

    let uri = "https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q="
    if(data.uai !== "") uri+="&refine.uai="+data.uai;
    if(data.year !== "") uri+="&refine.debutsemaine="+data.year;

    axios.get(uri).then((res)=>
    {
        console.log(res.data.records);
        setTab(res.data.records);
    }).catch((err)=>{
        console.log(err)
    })
  }
        return (<div>Remplir le formulaire 
            <select onChange={(e)=>{setData(curent=>({...curent,year:e.target.value  }))}}>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>

            </select>
            <input type="text" onChange={(e)=>{setData(curent=>({...curent,uai:e.target.value  }))}}/>
            <button onClick={get}>afficher</button>
            {
            
     tab.map((item,index)=>{
                return (
                   
        <div key={index}>
            <ul> 
            { 
                Object.entries(item.fields).map(([value1,key])=>{
                    
                
                return (   <div>

                  <li> {key}:{value1}</li>
                </div>);
                })
            }
         
</ul>
            </div>

                );
     } )}
       
        </div>)
 
}