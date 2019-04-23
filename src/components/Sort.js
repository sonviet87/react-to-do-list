import React, { Component } from 'react';


class Sort extends Component {
    render() {
        return (

                <div className="col-md-4">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sắp xếp
                            <span className="caret"></span></button>
                        <ul className="dropdown-menu sort-menu">
                            <li className="sort_seleted"><a >a-z</a></li>
                            <li><a >z-a</a></li>
                            <li className="divider"></li>
                            <li><a >Trang thái kích hoạt</a></li>
                            <li><a >Trang thái ẩn</a></li>
                        </ul>
                    </div>
                </div>

        );
    }
}

export default Sort;