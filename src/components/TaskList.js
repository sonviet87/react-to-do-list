import React, { Component } from 'react';
import TaskItem from "./TaskItem";
import {connect} from 'react-redux';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state={
            filterName:'',
            filterStatus:-1
        }
    }

    onChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(name === 'filterName'? value: this.state.filterName,name === 'filterStatus'? value: this.state.filterStatus);
        this.setState({
            [name]:value
        });
    }

    render() {

        var {task}= this.props;
        var {filterName,filterStatus} = this.props;
        var elmTask = task.map((task,index) =>{
            return <TaskItem key={task.id} index={index} task={task} />
        });
        return (

            <div className="clearfix">

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trang thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td> <input type="text"  name="filterName" className="form-control" onChange={this.onChange}/></td>
                            <td> <select className="form-control" name="filterStatus" onChange={this.onChange}>
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>

                            </select></td>
                            <td></td>
                        </tr>
                        {elmTask}


                    </tbody>
                </table>

            </div>

        );
    }
}

const mapStateToProps1 =(state) =>{
    return {
        task: state.tasks
    }
}

export default connect(mapStateToProps1,null) (TaskList);
