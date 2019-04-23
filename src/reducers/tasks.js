import  *  as types from './../contants/ActionTypes';
 var s4=()=>{
    return Math.floor((1+Math.random())* 0x1000).toString(16).substring(1);
}

var randomID =() =>{
    return s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4();
}


var findIndex =(task,id)=>{

    var result=-1;
    task.forEach((task,index)=>{
        if(task.id===id){
            return result=index;
        }
    });
    return result;
}
var data = JSON.parse(localStorage.getItem('task'));
var initialState = data? data:[];

var myReducer = (state = initialState, action) =>{
    var id='';
    var index=-1;
    switch (action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:

            var newTask = {
                id: randomID(),
                name: action.task.name,
                status: action.task.status
            }
            state.push(newTask);
            localStorage.setItem('task',JSON.stringify(state));
            return [...state];
        case  types.UPDATE_STATUS_TASK:
            id= action.id;
             index =findIndex(state,id);
            // cach1
           state[index].status = !state[index].status;
            // clone 1 task roi gan lai cho task de view cap nhat
           /* var cloneTask = {...state[index]};
            cloneTask.status = !cloneTask.status;
            state[index] = cloneTask;*/
           // cách 2
           /* state[index] ={
                ...state[index],
                status:!state[index].status
            };*/

            localStorage.setItem('task',JSON.stringify(state));
            return [...state];

        case types.DELETE_TASK:
             id= action.id;
             index =findIndex(state,id);
            state.splice(index,1);
            localStorage.setItem('task',JSON.stringify(state));
            return [...state];

        default: return state;
    }

};

export  default myReducer;