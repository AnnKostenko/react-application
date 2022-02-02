import React from "react";
import { useState } from "react";
import styled, { css } from 'styled-components'

const Table = styled.table`
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  border-radius: 10px;
  border-spacing: 0;
  text-align: center;
`
const Th = styled.th`
  background: #BCEBDD;
  color: white;
  text-shadow: 0 1px 1px #2D2020;
  padding: 10px 20px;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: white;
    &:first-child{
      text-align: left;
      border-top-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
      border-right: none;
      }
`
const Td = styled.td`
  padding: 10px 20px;
  background: #F8E391;
`
const Tr = styled.tr`
  &:last-child td:first-child {
    border-radius: 0 0 0 10px;
  }
  &:last-child td:last-child {
    border-radius: 0 0 10px 0;
  }
  td:last-child {
    border-right: none;
  }
`


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
    <Table>
      <thead>
        <Tr>
        {namesArray.map((name, id) => {
          return (
            <Th key={name + id}>{name}</Th>
          )
        })}
        </Tr>
      </thead>
      <tbody>
        {logsArray.map(log => {
              return (
                <Tr key={log.id}>
                    <Td>{log.id}</Td>
                    <Td>{log.date}</Td>
                    <Td>{log.user}</Td>
                    <Td>{log.train_type}</Td>
                    <Td>{log.duration}</Td>
                    <Td>{log.kcal}</Td>
                    <Td>{log.pulse}</Td>
                </Tr>
              )
        })}
      </tbody>
    </Table>
  
  )
}


export default Parse;
