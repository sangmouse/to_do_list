
import React,{Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';


class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        tasks:[],
        isDisplayForm:false,
        taskEditing:null,
        // id,name,status
        filter:{
          name:'',
          status:-1
        },
        keyword:'',
        sortBy:'name',
        sortValue:1
      };
    }
    
    s4(){
      return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1)
    }
    generateID(){
      return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
    }
    componentWillMount(){
      if (localStorage && localStorage.getItem('tasks')) {
        var tasks = JSON.parse(localStorage.getItem('tasks'))
        this.setState({
          tasks:tasks
        })
      }
    }
    onToggleForm = () =>{
      if(this.state.isDisplayForm && this.state.taskEditing!== null){
        this.setState({
          isDisplayForm:true,
          taskEditing:null
        })
      }else{
        this.setState({
          isDisplayForm:!this.state.isDisplayForm,
          taskEditing:null
        })
      }
      
    }
    onCloseForm = (params) =>{
      this.setState({
        isDisplayForm:params
      })
    }
    onProcessData = (data) =>{
      var tasks = this.state.tasks
      if(data.id === ''){
        data.id=this.generateID()
        tasks.push(data)
      }else{
        var index=this.findIndex(data.id)
        tasks[index]=data
      }
      
      this.setState({
        tasks:tasks,
        taskEditing:null
      })
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    onUpdateStatus = (id) =>{
      var tasks = this.state.tasks
      var index = _.findIndex(tasks, (task) =>{
        return task.id===id
      })
      if(index !== -1){
        tasks[index].status = !tasks[index].status
        this.setState({
          tasks:tasks
        })
      }
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    onDeleteItem = (id) =>{
      var tasks=this.state.tasks
      var index=this.findIndex(id)
      if(index !== -1){
        tasks.splice(index, 1)
        this.setState({
          tasks:tasks
        })
      }
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    findIndex = (id) =>{
      var tasks = this.state.tasks
      var result=-1
      tasks.forEach((task, index) =>{
        if(task.id === id){
          result=index
        }
      })
      return result
    }
    onReceiveEvent = (value) =>{
      this.setState({
        isDisplayForm:value
      })
    }
    onUpdate = (id) =>{
      this.setState({
        isDisplayForm:true
      })
      var tasks=this.state.tasks
      var index=this.findIndex(id)
      var taskEditing=tasks[index]
      this.setState({
        taskEditing:taskEditing
      })
    }
    onFilter = (filterName, filterStatus) =>{
      filterStatus = parseInt(filterStatus, 10)
      this.setState({
        filter:{
          name:filterName.toLowerCase(),
          status:filterStatus
        }
      })

    }
    onSearch = (keyword) =>{
      this.setState({
        keyword:keyword
      })
    }
    onSort = (sortBy, sortValue) =>{
      this.setState({
        sortBy:sortBy,
        sortValue:sortValue
      })
      
    }
    render() {
      var tasks=this.state.tasks
      var taskEditing=this.state.taskEditing
      var isDisplayForm=this.state.isDisplayForm
      var filter=this.state.filter
      var keyword=this.state.keyword
      var sortBy=this.state.sortBy
      var sortValue=this.state.sortValue

      if(filter){
        if(filter.name){
          tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filter.name) !== -1
          })
        }
        tasks = tasks.filter((task) =>{
          if(filter.status === -1){
            return task
          }else{
            return task.status===(filter.status === 1?true:false)
          }
        })
        
      }
      if(keyword){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(keyword) !== -1
        })
      }
     if(sortBy === 'name'){
      tasks.sort((a,b) =>{
       if(a.name > b.name) return sortValue
       if(a.name < b.name) return -sortValue
       else return 0
      })
     }else{
      tasks.sort((a,b) =>{
        if(a.status > b.status) return -sortValue
        if(a.status < b.status) return sortValue
        else return 0
       })
     }
      


      // 
      var elementTaskForm=isDisplayForm?<TaskForm 
      onReceiveEvent={this.onCloseForm} 
      onReceiveDataForm={this.onProcessData}
      taskEditing={taskEditing}
      />:''

        return (
            <div className="main">
                <div className="container">
                  <div className="text-center">
                    <h1 className="title">Work Management</h1>
                  </div>
                  <div className="row">
                    <div className={isDisplayForm?'col-4':''}>
                      {elementTaskForm}
                    </div>
                    <div className={isDisplayForm?'col-8':'col-12'}>
                      <button 
                      type="button" 
                      className="btn btn-primary btn-add-work"
                      onClick={this.onToggleForm}
                      >
                          Thêm Công Việc
                      </button>  
                      
                      <Control 
                      onSearch={this.onSearch} 
                      onSort={this.onSort} 
                      sortBy={sortBy} 
                      sortValue={sortValue}
                      ></Control>

                      <TaskList tasks={ tasks } 
                      onUpdateStatus={this.onUpdateStatus}
                      onDeleteItem={this.onDeleteItem}
                      onReceiveEvent={this.onReceiveEvent}
                      onUpdate={this.onUpdate}
                      onFilter={this.onFilter}
                      ></TaskList>
                    </div>
                </div>
              </div>
            </div>
        );
    }
}

export default App;
