import React,{Component} from 'react';

class Sort extends Component {

 

  option = (sortBy, sortValue) =>{
    this.props.onSort(sortBy, sortValue)
  }


  
    render() {
        return (
            <div className="col-6">
                        
                          <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown">
                                  Sắp xếp
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" >
                              <a className="dropdown-item" href=" # " onClick={ () => this.option('name', 1)}>Tên A-Z <span><i className="fas fa-check" id={this.props.sortBy === 'name' && this.props.sortValue === 1?'sort-selected':' '}></i></span></a>
                              <a className="dropdown-item" href=" # " onClick={ () => this.option('name', -1)}>Tên Z-A <span><i className="fas fa-check" id={this.props.sortBy === 'name' && this.props.sortValue === -1?'sort-selected':' '}></i></span></a>
                              <a className="dropdown-item" href=" # " onClick={ () => this.option('status', 1)}>Trạng thái kích hoạt <span><i className="fas fa-check" id={this.props.sortBy === 'status' && this.props.sortValue === 1?'sort-selected':' '}></i></span></a>
                              <a className="dropdown-item" href=" # " onClick={ () => this.option('status', -1)}>Trạng thái ẩn <span><i className="fas fa-check" id={this.props.sortBy === 'status' && this.props.sortValue === -1?'sort-selected':' '}></i></span></a>
                            </div>
                          </div>
                    </div>
        );
    }
}

export default Sort 