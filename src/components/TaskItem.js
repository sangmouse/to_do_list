import React,{Component} from 'react';

class TaskItem extends Component {


    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDeleteItem = () =>{
        this.props.onDeleteItem(this.props.task.id)
        this.props.onReceiveEvent(false)
    }
    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id)
    }
    
    render() {

        var tasks=this.props.task
        var index=this.props.index

        return (
            <tr>
                <td>{index+1}</td>
                <td>{tasks.name}</td>
                <td className="text-center">
                    <span className={tasks.status === true?'label label-success':'label label-danger'}
                        onClick={this.onUpdateStatus}
                    >
                                {tasks.status === true?'Active':'Hidden'}
                                
                            </span>
                </td>
                <td className="text-center">
                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={this.onUpdate}
                    >
                        Sửa
                    </button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={this.onDeleteItem}
                    
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem