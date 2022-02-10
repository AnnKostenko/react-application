import React from "react";
import styled, { css } from 'styled-components'

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
const Td = styled.td`
  padding: 10px 20px;
  background: #F8E391;
`

function BodyTable ({logsArray}){
  // var map = new Map(Object.entries(logsArray));
  // console.log(Object.values(logsArray))
  
  // for (const [key, value] of Object.entries(logsArray)) {
  //   console.log(`${key}: ${value}`);
  // }
    return(
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
    )
   
}

export default BodyTable