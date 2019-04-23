import React, { Component } from 'react';

import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import {connect} from 'react-redux';
import  *  as actions from './actions/index';
class App extends Component {
   constructor(props){
       super(props);
       this.state ={
           keyword:''
       }
   }






    onToggleForm= () =>{

       /* if(this.state.isDisplayForm && this.state.taskEditing!==null){
            this.setState({
                isDisplayForm:true,
                taskEditing:''
            });
        }else{
            this.setState({
                isDisplayForm:!this.state.isDisplayForm,
                taskEditing:''
            });
        }*/
       this.props.onToggleForm();

    }

   /* onCloseForm = ()=>{
        this.setState({
            isDisplayForm:false,
            taskEditing:''
        });
    }
*/
    onOpenForm = ()=>{
        this.setState({
            isDisplayForm:true
        });
    }

  /*  onSubmit = (data)=>{
        var {task} = this.state;
        if(data.id===''){
            data.id=this.generateID();

            task.push(data);
        }else{
            var index = this.findIndex(data.id);
            task[index] =data;
        }

       this.setState({
           task:task,
           taskEditing:''
       });
       localStorage.setItem('task',JSON.stringify(task));
    }*/



    findIndex(id){
        var {task} = this.state;
        var result=-1;
        task.forEach((task,index)=>{
            if(task.id===id){
                return result=index;
            }
        });
        return result;
    }



    onUpdate =(id)=>{
        var {task} = this.state;
        var index = this.findIndex(id);

        var taskEditing=task[index];

        this.setState({
            taskEditing:taskEditing
        });

        this.onOpenForm();
    }

    onFilter = (filterName,filterStatus)=>{

        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter:{
                name:filterName.toLowerCase(),
                status:filterStatus
            }
        });
    }

    onSearch = (keyword)=>{
       this.setState({
           keyword:keyword
       });
    }

  render() {
        var {task,taskEditing,filter,keyword}=this.state;
       if(filter){
           if(filter.name){
              task= task.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name) !==-1;
               });
           }

           task= task.filter((task)=>{
               if(filter.status ===-1){
                   return task;
               }else{
                   return task.status ===(filter.status ===1? true: false);
               }
           });
       }
       if(keyword){
           task= task.filter((task)=>{
               return task.name.toLowerCase().indexOf(keyword) !==-1;
           });
       }

       var {isDisplayForm} = this.props;


    return (

      <div className="App">
          <div className="content">
              <div className="title-app text-center"><h1>Quản lí công việc</h1></div>
          </div>
          <div className="container">
              <div className={isDisplayForm?'col-md-4':''}>
                  <TaskForm   />
              </div>
              <div className={isDisplayForm?'col-md-8':'col-md-12'}>
                    <div className="top-header">
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}><i className="fa fa-plus" aria-hidden="true"></i>  Thêm công việc</button>

                    </div>
                  <hr/>
                    <Control onSearch={this.onSearch}/>
                  <hr/>
                 <TaskList   onFilter={this.onFilter}/>
              </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = state =>{
    return {
        isDisplayForm:state.isDisplayForm
    }
}
const mapDispathToProps = (dispatch,props) =>{
    return {
        onToggleForm:()=>{
            dispatch(actions.toggleForm())
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps) (App);
