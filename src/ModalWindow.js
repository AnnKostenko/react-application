import React from "react";
import "./ModalWindow.css";
import { useState, useEffect } from "react";
import styled from 'styled-components'

const Dialog = styled.dialog`
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    position: fixed;
    top: 25%;
    max-width: 30rem;
    width: 100%;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: .25rem .25rem .25rem rgba(0, 0, 0, 0.050624), 0 0 .25rem rgba(0, 0, 0, 0.07);
    border: none;
    flex-direction: column;
    padding: 2rem 1.5rem;
`
const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom 1rem;
`
const DialogBody = styled.div`
    display: flex;
    flex-direction: column;
`
const DialogFooter = styled.div`
    display: flex;
    justify-content: space-between;
`
const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 75%;
    margin-bottom: .75rem;
    font-size: .75rem;
    line-height: 2;
    font-weight: 700;
`
const Button = styled.button`
    background: transparent;
    border-radius: 10px;
    border: 2px solid #F8E391;
    color: #F8E391;
    padding: 0.25em 1em;
    &:disabled{
        border-color: #c8c8c8;
        color: #c8c8c8;
    }
`
const H1 = styled.h1`
    margin: 0 0 .5rem 0;
    font-size: 1.5rem;
    line-height: 1.75rem;
    font-weight: 700;
    text-align: center;
    
`
const Input = styled.input`
    margin-top: .25rem;
    background: #F9F6F6;
    padding: .5rem 1rem;
    border: 1px solid #E5E5E5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  
`

const ModalWindow = () => {

    const [logsItem, setLogsItem] = useState({});

    const openNew = () => {
        document.querySelector('.modal').classList.toggle("open");
    }
    const hideNew = () => {
        document.querySelector('.modal').classList.remove("open");
        document.querySelectorAll('input').forEach((element) => {
            element.value = "";
          })
        document.querySelector('.button-save').removeAttribute("disabled");
    }
    const onInputChange = (e, name) => { 
        const val = (e.target && e.target.value) || ''; 
        let _logsItem = { ...logsItem };
         _logsItem[`${name}`] = val;
         setLogsItem(_logsItem); 
    }

    useEffect(
        () => {
            document.querySelector('.button-save').removeAttribute("disabled");
        },
        [logsItem],
      );
   
    const saveUser = () => {
        const BASE_URL = 'https://script.google.com/macros/s/AKfycbyiw5VtjqT-l4o7YMHfJMjjCOMN2u0cefgM73CqyuGZer2hBQOng6pOdnUI4wASFWe11w/exec?'
        const url = `${BASE_URL}user=${ logsItem.user }&train_type=${ logsItem.train_type }&duration=${ logsItem.duration }&kcal=${ logsItem.kcal }&pulse=${ logsItem.pulse }`
        fetch(url);
        document.querySelector('.button-save').setAttribute("disabled", "disabled");
    }

    return(
        <>
        <Button type="button" className="add-button" onClick={openNew} >????????????????</Button>

        <Dialog className="modal">
           <DialogHeader>
               <H1>???????????????? ????????????????????????</H1>
               <Button type="button" onClick={hideNew}>Close</Button>
           </DialogHeader>
           <DialogBody>
                <Label>
                    ?????? ????????????????????????
                    <Input name="user" type="text" placeholder="?????? ????????????????????????" value={logsItem.user} onChange={(e) => onInputChange(e, 'user')}/>
                </Label>    
                <Label>
                    ?????? ????????????????????
                    <Input name="train_type" type="text" placeholder="?????? ????????????????????" value={logsItem.train_type} onChange={(e) => onInputChange(e, 'train_type')}/>
                </Label> 
                <Label>
                    ????????????????????????
                    <Input name="duration" type="text" placeholder="????????????????????????" value={logsItem.duration} onChange={(e) => onInputChange(e, 'duration')}/>
                </Label>      
                <Label>
                    ????????
                    <Input name="kcal" type="text" placeholder="????????" value={logsItem.kcal} onChange={(e) => onInputChange(e, 'kcal')}/>
                </Label>   
                <Label>
                    ?????????????? ??????????
                    <Input name="pulse" type="text" placeholder="?????????????? ??????????" value={logsItem.pulse} onChange={(e) => onInputChange(e, 'pulse')}/>
                </Label>   
           </DialogBody>
           <DialogFooter>
                <Button type="button" className="button-save" onClick={saveUser}>??????????????????????</Button>
                <Button type="button" onClick={hideNew}>????????????</Button>
           </DialogFooter>
        </Dialog>
        </>
    )
}
export default ModalWindow