import React, {Component} from 'react'

import classes from './search.module.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class Search extends Component{
 
    
render(){
  return (
    <Card>
    <CardContent>
        <form action="#" method="GET" onSubmit={this.props.submit}>
        
        <select className={classes.select} onChange={this.props.select}>
          <option value="title">Title</option>
          <option value="isbn">ISBN</option>
          </select>

            <input type="text" placeholder="Enter Book Name or ISBN" onChange={this.props.change} value={this.props.val} className={classes.input}></input>
            <Button variant="contained" color="primary" className={classes.button} type="submit">
                
                  Search
                 
            </Button>
            
        </form>
        </CardContent>
        </Card>
  )
}
}
export default Search;