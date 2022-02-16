import React from "react";
import { useState, useEffect } from "react";
import styled from 'styled-components'
import HeadTable from "./HeadTable";
import BodyTable from "./BodyTable";
import ModalWindow from "./ModalWindow";

const Table = styled.table`
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  border-radius: 10px;
  border-spacing: 0;
  text-align: center;
  width: 100%;
  max-width: 50%;
`
const Input = styled.input`
    margin-top: .25rem;
    background: #F9F6F6;
    padding: .5rem 1rem;
    border: 1px solid #E5E5E5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
`
const SearchBlock = styled.div`
    margin-bottom: 1rem;
`
const Label = styled.label`
  margin-right: .75rem;
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
`

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjcwOmp3Wq2YqbMc2mI44uDnUhdun8weGiEdQlQi9EvuUnrQKloLTMoXJFeLwDuc6RYAgHq4RlzoDs/pub?output=tsv';

const Parse = () => {

  const [logsArray, setLogsArray] = useState([])
  const [namesArray, setNamesArray] = useState([])
  const [search, setSearch] = useState("");
  const [directionSort, setDirectionSort] = useState(true); // значение true или false (для определения направления сортировки)


  function loadData(){
    fetch(url).then(r => r.text()).then((text)=> {
      const {logs, names} = parseMethod(text)
      setLogsArray(logs)
      setNamesArray(names)
    });
  }

  function parseMethod(text){
    const arr = text.toString().split('\r\n').map(str => str.split('\t'));
    const names = arr.shift();
    const logs = arr.map(log => log.reduce((acc, el, i) => {
      acc[names[i]] = el;
      return acc;
    }, {}));
    return {logs, names}
  }

  const searchUser = logsArray.filter(log => { 
    if (search === "") { 
      return log; 
    } else if (log.user.toLowerCase().includes(search.toLowerCase())) { 
      return log; 
    } 
  }); 

  useEffect (() => { loadData()},[])

  const sortData = (field) =>{
    console.log(field) // выводим входной параметр (передается при клике)

    const copyData = logsArray.concat();  // создаем копию массива в котором у нас данные таблицы 

    let sortData; // переменная для того чтобы записывать уже отсортированые данные
    if (directionSort){
      sortData = copyData.sort(
        (a, b)=> { return a[field] > b[field] ? 1 : -1} //сортировка по убыванию [10 - 0]
      )
    }
    sortData = copyData.reverse(
      (a, b)=> { return a[field] > b[field] ? 1 : -1} //сортировка по возрастанию [0 -10]
    )
   

    setLogsArray(sortData) // выводим в таблицу уже отсортированые данные
    setDirectionSort(!directionSort) // чтобы при нажатии на "Заголовок", чередовался порядок сортировки (esc/desc)

  }

  return(
    <>
     <ModalWindow/>
     <SearchBlock>
        <Label>Поиск</Label>
        <Input
          type="text"
          placeholder="Поиск по пользователю"
          onChange={event => {
            setSearch(event.target.value);
          }}
        />
      </SearchBlock>
      <Table>
        <HeadTable namesArray= {namesArray} sortData={sortData}/>
        <BodyTable searchUser= {searchUser}/>
      </Table>
    </>
  )
}

export default Parse;
