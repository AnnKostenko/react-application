import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from 'styled-components'
import HeadTable from "./HeadTable";
import BodyTable from "./BodyTable";

const Table = styled.table`
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  border-radius: 10px;
  border-spacing: 0;
  text-align: center;
`

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjcwOmp3Wq2YqbMc2mI44uDnUhdun8weGiEdQlQi9EvuUnrQKloLTMoXJFeLwDuc6RYAgHq4RlzoDs/pub?output=tsv';

const Parse = () => {

  const [logsArray, setLogsArray] = useState([])
  const [namesArray, setNamesArray] = useState([])

  function parseMethod(){
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

  useEffect (() => { parseMethod()},[])
  
  return(
    <Table>
      <HeadTable namesArray= {namesArray}/>
      <BodyTable logsArray= {logsArray}/>
    </Table>
  
  )
}

export default Parse;
