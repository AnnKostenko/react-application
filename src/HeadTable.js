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

function HeadTable ({sortData, namesArray}){
    return(
        <thead>
          {/* <Tr>
            {namesArray.map((name, id) => {
              return (
                <Th key={name + id}>{name}</Th>
              )
            })}
          </Tr> */}
        <Tr>
            <Th>{namesArray[0]}</Th>  
            <Th>{namesArray[1]}</Th>  
            <Th>{namesArray[2]}</Th>  
            <Th>{namesArray[3]}</Th>  
            <Th onClick={()=>{sortData('duration')}}>{namesArray[4]}</Th>  
            <Th onClick={()=>{sortData('kcal')}}>{namesArray[5]}</Th>  
            <Th onClick={()=>{sortData('pulse')}}>{namesArray[6]}</Th>  
        </Tr>
      </thead>
    )
}

export default HeadTable