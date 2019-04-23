import React, { Component } from 'react';
import {connect} from 'react-redux';
import  * as actions from './../actions/index';
class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            status: false
        }
    }

    componentWillMount(){
        console.log('componentWillMount');
        if(this.props.itemEditing){
            this.setState({
                id:this.props.itemEditing.id,
                name:this.props.itemEditing.name,
                status:this.props.itemEditing.status,
            });
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        if(nextProps && nextProps.itemEditing){

            this.setState({
                id:nextProps.itemEditing.id,
                name:nextProps.itemEditing.name,
                status:nextProps.itemEditing.status,
            });
        }else {
            this.onClear();
        }
    }

    onCloseForm =()=>{
        this.props.onCloseForm()
    }

    onChange = (event) =>{
        var target =event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status'){
            value= target.value==='true'? true:false;
        }
        this.setState({
            [name]:value
        });
    }

    onSubmit = (event)=>{
        event.preventDefault();
       // this.props.onSubmit(this.state)
        this.props.onAddTask(this.state);
    }

    onClear =()=>{
        this.setState({
            name:'',
            status:false
        });
    }

    render() {
        var {id} = this.state;
        if(this.props.isDisplayForm===false) return '';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading clearfix"><div className="pull-left">{id!==''?'Cập nhật công việc':'Thêm công việc'}</div><div className="pull-right"><i className="fa fa-window-close" onClick={this.onCloseForm} aria-hidden="true"></i></div></div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Tên:</label>
                        <input type="name" className="form-control" id="name" name="name" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label >Trang thái:</label>
                        <select className="form-control" id="sel1" name="status" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>

                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning"><i className="fa fa-plus" aria-hidden="true"></i> Lưu lại</button>
                        <button type="button" className="btn btn-danger" onClick={this.onClear}><i className="fa fa-times" aria-hidden="true"></i> Hủy bỏ</button>
                    </div>

                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        isDisplayForm:state.isDisplayForm,
        itemEditing:state.itemEditing
    }
}

const mapDispathToProps = (dispatch,props) =>{
    return {
        onAddTask: (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm: ()=>{
            dispatch(actions.closeForm())
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps) (TaskForm);
