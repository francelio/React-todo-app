import React,{ Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos' 
export default class Todo extends Component {

    constructor (props) {
        super(props)
        this.state ={
            description:'',
            list:[]
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarckAsDone = this.handleMarckAsDone.bind(this)
        this.handleMarckAsPending = this.handleMarckAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.refresh()

    }
    handleSearch(){
        this.refresh(this.state.description)
    }
        refresh(description = '') {        
         const search = description ? `&description__regex=/${description}/` : ''        
         axios.get(`${URL}?sort=-createdAt${search}`)            
          .then(resp => this.setState({...this.state, description, list: resp.data}))     
        }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.refresh(this.state.description))
        }
      
    handleMarckAsDone(todo) {
            axios.put(`${URL}/${todo._id}`,{ ...todo, done : true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarckAsPending(todo) {
        axios.put(`${URL}/${todo._id}`,{ ...todo, done : false})
        .then(resp => this.refresh(this.state.description))
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL,{ description })
            .then(resp => this.refresh())
    }

    handleChange(e){
        this.setState({...this.state, description : e.target.value})
    }

    render () {
        return (
            <div>
               <PageHeader name='Tarefas' small='Cadastro' />
               <TodoForm 
               handleAdd = {this.handleAdd} 
               description = {this.state.description} 
               handleChange = {this.handleChange}
               handleSearch = {this.handleSearch}
               />
                <TodoList list={this.state.list}
                handleRemove={this.handleRemove}
                handleMarckAsDone={this.handleMarckAsDone} 
                handleMarckAsPending={this.handleMarckAsPending}  />
            </div>
        )
    }
}
