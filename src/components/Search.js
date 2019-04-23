import React, { Component } from 'react';


class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword:''
        }
    }

    onSearch= ()=>{
       this.props.onSearch(this.state.keyword);
    }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]:value
        });
    }

    render() {
        var {keyword} = this.state;
        return (

                <div className="col-md-4">
                    <div className="search-container">

                        <input type="text" placeholder="Search.." name="keyword"  value={keyword} onChange={this.onChange} />
                        <button type="submit"  className="btn btn-primary" onClick={this.onSearch}><i className="fa fa-search"></i>Tìm</button>

                    </div>
                </div>

        );
    }
}

export default Search;
