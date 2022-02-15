import React from "react";
import styled from 'styled-components'

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

function BodyTable ({searchUser}){
    return(
        <tbody>
        {searchUser.map(log => {
              return (
                <Tr key={log.id}>
                  {Object.entries(log).map(([key, value]) =>  <Td key={key}>{value}</Td>)}
                </Tr>
              )
        })}
      </tbody>
    )
}

export default BodyTable