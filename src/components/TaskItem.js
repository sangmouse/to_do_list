import React,{Component} from 'react';
import {connect} from 'react-redux'
import * as actions from './../actions/index'

class TaskItem extends Component {


    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDeleteItem = () =>{
        this.props.onDeleteTask(this.props.task.id)
        // this.props.onReceiveEvent(false)
        this.props.onCloseForm()
    }
    onUpdate = () =>{
        this.props.onOpenForm()
        // console.log(this.props.task)
        // this.props.onUpdate(this.props.task.id)
        this.props.onEditTask(this.props.task)
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

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
        onEditTask : (task) =>{
            dispatch(actions.editTask(task))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)