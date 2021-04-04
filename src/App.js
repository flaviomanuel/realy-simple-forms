import React, { useEffect, useState } from 'react';
import TableLine from './components/TableLine';
import {Table} from './styles'

import api from './services/api'

function App() {

  const [posicao, setPosicao] = useState()

  const initialValues = `{
    codigo: ${0}, 
    barra: 0,
    empresa: '',
    preco${posicao}: ${0},
  }`

  const [values, setValues] = useState([initialValues])

  useEffect(() => {
    api.get('/posicao').then(response => {
      setPosicao(response.data.posicao)
    })

  }, [])

  useEffect(() => {
    api.get('/itens').then(response => {
      setValues(response.data)
    })
    
    console.log('requisao:', values)
  
  }, [])



  function handleOnChange(event,index ) {
    
    const {value } = event.target;  

  
      const precoObj = {
        preco3: value
       }
 
        Object.assign(values[index], precoObj)
    
    setValues([...values])
    console.log('atualizacao: ',values)
  }

  async function handleSubmit(e) {
      e.preventDefault();

      try {
        await api.put('itens',values)
        alert('item atualizado com sucesso!')

    } catch(error) {
        if(error.request.status === 400) {
            alert("Algo está errado no formulário , revise as infromações novamente...")
        }
    }  
  }


  return (
        <form onSubmit={handleSubmit}>
      <Table >
        <thead>
        <tr>
          <th>Codigo</th>
          <th>Barra</th>
          <th>Empresa</th>
          <th>Preço</th>
        </tr>
        </thead>

        <tbody>

      {values.map((item, index) => (
          <>
          <TableLine
           key={item.id}
           td1={item.codigo}
           td2={item.barra}
           td3={item.empresa}
           td4={item.preco3}
           name={`preco${item.id}`} 
           onChange={event => handleOnChange(event, index)}
           isUpdate={true}
           />
            
          </>
           
      ))}
     
       
        </tbody>
        </Table>
        <button 
        type="submit">Confirmar</button>
        </form>
  );
}

export default App;
