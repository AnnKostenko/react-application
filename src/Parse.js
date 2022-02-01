import React from "react";
import { useState } from "react";


const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjcwOmp3Wq2YqbMc2mI44uDnUhdun8weGiEdQlQi9EvuUnrQKloLTMoXJFeLwDuc6RYAgHq4RlzoDs/pub?output=tsv';

const Parse = () => {

  const [logsArray, setLogsArray] = useState([])
  const [namesArray, setNamesArray] = useState([])

  console.log(namesArray, Date.now())

  if(logsArray.length == 0){
    fetch(url).then(r => r.text()).then((text)=> {
      const arr = text.toString().split('\r\n').map(str => str.split('\t'));
      const names = arr.shift();
      const logs = arr.map(log => log.reduce((acc, el, i) => {
        acc[names[i]] = el;
        return acc;
      }, {}));
      setLogsArray(logs)
      setNamesArray(names)
    });
  }
  
  

  return(
    <table>
      <thead>
        <tr>
        {namesArray.map((name, id) => {
          return (
            <th key={name + id}>{name}</th>
          )
        })}
        </tr>
      </thead>
      <tbody>
        {logsArray.map(log => {
              return (
                <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.date}</td>
                    <td>{log.user}</td>
                    <td>{log.train_type}</td>
                    <td>{log.duration}</td>
                    <td>{log.kcal}</td>
                    <td>{log.pulse}</td>
                </tr>
              )
        })}
      </tbody>
    </table>
  
  )
}


export default Parse;
