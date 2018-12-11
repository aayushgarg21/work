import React from "react";
import Paper from '@material-ui/core/Paper';
import Subscription from "./../components/ApplicationSubscribed";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';



class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            pageNo: 1,
            pages: [],
            render : ""
        }

    }

    componentDidMount() {
      
        
        const queryString = require('query-string');
        var arr = window.location.hash.split("search")
        var location = arr[1];
        const parsed = queryString.parse(location);
        console.log(parsed);
        var name = parsed.select;
        var page =  Number(parsed.page)



        fetch(`/search?value=${name}&page=${page}`, {
            method: 'GET',

        }).then((response) => {
            return response.json();
        })
            .then((myJson) => {
                this.setState({ applications: myJson })
            })
        fetch(`http://localhost:3000/count/${name}/`, {
            method: 'GET',

        }).then((response) => {
            return response.json();
        })
            .then((myJson) => {
                var pageCount = myJson.count;
                var list = [];
              
                   if ( pageCount%5 === 0)
                    {
                   pageCount = pageCount - 1;
                     }
                     var i = 0;
                for(i = 1; i < pageCount/5 + 1 ; i++)
                        {
                      list.push(i);
                          }
                this.setState({ pages : list })
            })

    }
    handlePageChange(value) {
        window.location.reload();
        window.location = `/#/search?select=tes&page=${value}`

        
        // const queryString = require('query-string');
        // var arr = window.location.hash.split("search")
        // var location = arr[1];
        // const parsed = queryString.parse(location);
        // console.log(parsed);
        // var name = parsed.select
        // fetch(`http://localhost:3000/search/${name}/${value}`, {
        //     method: 'GET',

        // }).then((response) => {
        //     return response.json();
        // })
        //     .then((myJson) => {
        //         this.setState({ applications: myJson })
        //     })
    }


    render() {
        return (
            <div className="search_view">
                <Paper>
                    {(this.state.applications) ?


                        this.state.applications.map((element) => {
                            return (
                                <div>
                                    {(element.name !== "No Registrations")
                                        ? <div className="grid_parent">
                                            <div>
                                                <Link to={`/app-view/${element.name}/${element.version}`} style={{ textDecoration: "none", cursor: "pointer" }} ><Typography variant="title" color="primary"> {element.name}</Typography></Link>
                                                <Typography variant="subtitle1"> {element.description}</Typography>
                                                <div>
                                                    <Typography variant="subheading"  > {element.userName} </Typography>
                                                    <Typography variant="subtitle1">Registered at : {element.time}</Typography>
                                                </div>

                                            </div>
                                            <div className="grid_child">
                                                <Subscription appName={element.name}></Subscription>
                                            </div>

                                        </div>

                                        : <div style={{ padding: 20 }}><Typography variant="title1">0 Applications Registered</Typography></div>}
                                    <hr></hr>
                                </div>)
                        })
                        : <div></div>
                    }
                </Paper>
                <div className="center">

                    <div className="pagination" style = {{padding : 10}}>
                        <button>&laquo;</button>
                        {this.state.pages.map((element) => 
                            {
                                return(<button onClick =  { () => this.handlePageChange(element)}>{element}</button>)
                            })}
                        <button>&raquo;</button>
                    </div>

                </div>
            </div>
        );

    }
}
export default Search;