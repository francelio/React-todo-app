import React from 'react'
import Grid from '../template/grid';
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
      if (e.key === 'Enter'){
          e.shiftKey ? props.handleSearch() : props.handleAdd()
      } else if (e.key === 'Escape'){
        props.handleClear()
      }
    }


    return(
      <div role='form' className='todoForm'>
      <Grid cols='12 9 10'>
            <input id='description' className='form-control'
            placeholder='Adicione uma tarefa'
            onKeyUp={keyHandler}
            value = {props.description} 
            onChange={props.handleChange}></input>
      </Grid>
      <Grid cols='12 3 2'>
        <IconButton onClick={props.handleAdd} style='primary' icon='plus' ></IconButton>
        <IconButton onClick={props.handleSearch} style='info' icon='search' ></IconButton>
        <IconButton onClick={props.handleClear} style='info' icon='close ' ></IconButton>
      </Grid>
    </div>
    )
}
