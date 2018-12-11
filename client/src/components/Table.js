import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import scrollToComponent from 'react-scroll-to-component';
import { ListItem } from '@material-ui/core';
import Subscription from "./ApplicationSubscribed"






const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  counter1 = 0;
  counter2 = 0;
  
  componentDidMount() {
    var name = this.props["applicationName"];
    var version = this.props.version;
    console.log(this.props);
    console.log(version);
    fetch(`/render-table/${name}/${version}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ data: myJson });

      })
  }

  scroll(name)
  {
    // this.name.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  
  render() {
    const { classes } = this.props;
   
    
    return (
      
      <div   >

       
         
          <div className = "grid_parent">
          <div >
          <Subscription appName = {this.props["applicationName"]}/>
          </div>
          <div className = "grid_child">
          <h4 className = "title">Activites Description</h4>

          <List>
          {
         this.state.data.map(t => {
           return(
             
           <ListItem  onClick={() => scrollToComponent(t.name, { offset: 0, align: 'top', duration: 1500})} style = {{cursor : "pointer"}} >
           {t.name}
           </ListItem>)
          })

          }
          </List>
          </div>
        

        </div>


        <Paper className={classes.root}>
          <Table className="table">
            <TableHead className = "table">
              <TableRow >
                <TableCell className = "table_head">activity_code</TableCell>
                <TableCell className = "table_head" >name</TableCell>
                <TableCell  className = "table_head">description</TableCell>
                <TableCell className = "table_head" >activity-schema</TableCell>
                <TableCell className = "table_head">example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className = "table">
              {this.state.data.map(t => {
                return (
                  <TableRow key={t.id} ref={(section) => { t.name = section; }} id = "boder">
                    <TableCell component="th" scope="row">
                      {t.activity_code}
                    </TableCell>
                    <TableCell  className = "table">{t.name}</TableCell>
                    <TableCell className = "table" >{t.description}</TableCell>
                    <TableCell >
                      <TableRow>
                        <TableCell ><code>Actor</code></TableCell>
                        <TableCell>{t.activity_schema.actor}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><code>Target</code></TableCell>
                        <TableCell>{t.activity_schema.target}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><code>Object</code></TableCell>
                        <TableCell>{t.activity_schema.object}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><code>Published</code></TableCell>
                        <TableCell>{t.activity_schema.published}</TableCell>
                      </TableRow>
                    </TableCell>
                    <TableCell className = "table_example">
                    {t.example.map(e=>{
                      return(<TableRow> 
                        <code>{e}</code></TableRow>)
                    })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>

    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);