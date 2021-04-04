import React from 'react';
import { TD, TR } from './styles';
// import NumberFormat from 'react-number-format';
import CurrencyInput from '../CurrencyInput'


const TableLine = ({td1, td2, td3, td4, isUpdate, name, onChange }) => {

    console.log('td4: ', td4)
    return (
        <TR>
          <TD>{td1}</TD>
          <TD>{td2}</TD>
          <TD>{td3}</TD>
            { isUpdate ? (
            <TD>
               <CurrencyInput  
                placeholder="R$0.00" 
                type="text"
                value={td4}
                onChange={onChange}
                />
            </TD>
            )
            : <TD>{td4}</TD>}
        </TR>
     
    )
}

export default TableLine;