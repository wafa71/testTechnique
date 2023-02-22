import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
 import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
 
function EB3() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [data,setData]=useState({
    uai : "",
    year : ""
   }) 
   const [tab,setTab]= useState([]);

  const [chartOptions, setChartOptions] = useState({});

  function get(e) {
    console.log('Le lien a été cliqué.');

    let uri = "https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q="
    if(data.uai !== "") uri+="&refine.uai="+data.uai;
    if(data.year !== "") uri+="&refine.debutsemaine="+data.year;
    let sommephone= 0,someOrd =0 , sommetabl = 0; 
    axios.get(uri).then((res)=>
    {
        console.log(res.data.records);
        setTab(res.data.records);

        tab.forEach(element => {
         Object.entries(element.fields).forEach(([key,value])=>{
            if(key==="visites_ordinateur"){
                if(!isNaN(value)) 
                {console.log(value)
                    someOrd+=parseInt(value)}
            }
            if(key.includes("visites_tablette")){
                if(!isNaN(value)) sommetabl+=parseInt(value)
            }
            if(key.includes("visites_smartphone")){
                if(!isNaN(value)) sommephone+=parseInt(value)
            }
        
        })
        });
        console.log(someOrd)
        setChartData(current=>({...current,
            datasets: [
                {
                  label: "",
                  data: [sommetabl,sommephone,someOrd],
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.4)",
                },
              ],}))
    }).catch((err)=>{
        console.log(err)
    })
  }
  useEffect(() => {
    setChartData({
      labels: ["tablette","smartphone","ordinateur"],
      datasets: [
        {
          label: "",
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    },[setChartData]);
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "",
        },
      },
    });
  }, []);
 
  return (
    <div >
  <select onChange={(e)=>{setData(curent=>({...curent,year:e.target.value  }))}}>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>

            </select>
            <input type="text" onChange={(e)=>{setData(curent=>({...curent,uai:e.target.value  }))}}/>
            <button onClick={get}>afficher</button>

      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}
 
export default EB3;
 