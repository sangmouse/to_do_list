import React,{Component} from 'react';

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword:''
        };
    }

    onChange = (event) =>{
        var target=event.target
        var name=target.name
        var value=target.value
        this.setState({
            [name]:value
        })
    }

    onSearch = () =>{
        this.props.onSearch(this.state.keyword)
    }
    render() {
        return (
            <div className="col-6">
                <div className="input-gr">
                    <input 
                    type="text" 
                    placeholder="enter here.............."
                    value={this.state.keyword}
                    name='keyword'
                    onChange={this.onChange}
                    />
                    <button 
                    className="btn-search"
                    type="button"
                    onClick={this.onSearch}

                    >Search</button>
                </div>
            </div>
        );
    }
}

export default Search