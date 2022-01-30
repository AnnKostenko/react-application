import React from "react";


const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjcwOmp3Wq2YqbMc2mI44uDnUhdun8weGiEdQlQi9EvuUnrQKloLTMoXJFeLwDuc6RYAgHq4RlzoDs/pub?output=tsv';

const Parse = text => {
  const arr = text.toString().split('\r\n').map(str => str.split('\t'));
  const names = arr.shift();
  const logs = arr.map(log => log.reduce((acc, el, i) => {
    acc[names[i]] = el;
    return acc;
  }, {}));
  

  return(
    <table>
      <thead>
        <tr>
          <th>{names[0]}</th>
          <th>{names[1]}</th>
          <th>{names[2]}</th>
          <th>{names[3]}</th>
          <th>{names[4]}</th>
          <th>{names[5]}</th>
          <th>{names[6]}</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => {
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
        {console.log(logs)}
        {console.log(names)}
      </tbody>
    </table>
  
  )
}

fetch(url).then(r => r.text()).then(Parse);


export default Parse;
