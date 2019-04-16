import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import classes from './listing.module.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
export default function listing(props) {
    let books=null;
    if (props.found){
        if(props.search==="isbn"){
           books = <ListItem alignItems="flex-start" className={classes.pointer}>
                
                <ListItemText
                primary={props.books.details.title}
                secondary={
                    <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                   {props.books.details.revision} Revisions | Published by <em>{props.books.details.publisher}</em>
                    </Typography>
                   
                    </React.Fragment>
                }
                />
                </ListItem>

        }else{

            books =  props.books.map((book,index)=>{
            return ( <ListItem alignItems="flex-start" key={index} className={classes.pointer}>
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={"http://covers.openlibrary.org/b/olid/"+book.cover_edition_key+"-S.jpg"} />
                </ListItemAvatar>
                <ListItemText
                primary={book.title}
                secondary={
                    <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                    by <em>{book.author_name}</em>
                    </Typography>
                    <span>{book.edition_count} Editions</span> | First Published in {book.first_publish_year}
                    </React.Fragment>
                }
                />
                </ListItem>
                )
                
            
            
            })
        }  
    }else if(props.loading){
        books = <p>Loading Data...</p>
    }else if(!props.found & props.books !==null){
        console.log('not found')
        books = <p>Sorry No Books Found</p>
    }else{
        books = null
    }

  return (
     
      <div>
      {books !== null? <Card  className={classes.root}>
      <CardContent>
      
      <List>
          {books}
      </List>         
      </CardContent>
      </Card>:null
      }

        </div>
        
  )
}
