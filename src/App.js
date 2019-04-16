import React, { Component } from 'react';
import Listing from './components/listing/listing';
import Search from './components/search/search';
import Login from './login'
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn:false,
      name:null,
      username:null,
      search:'',
      books:null,
      isLoading:false,
      defaultSearch:"title",
      isfound:false
    }

    this.searchInput = React.createRef();
  }

  responseGoogle = (response)=>{
    if(response.w3.U3){
      console.log(response)
      this.setState({
        isLoggedIn:true,
        username:response.w3.U3,
        name:response.w3.ig
      })
      sessionStorage.setItem('User',JSON.stringify(response))

    }
   
  }

  componentDidMount(){
    if(sessionStorage.getItem('User')){
      let response = JSON.parse(sessionStorage.getItem('User'));
      this.setState({
        isLoggedIn:true,
        username:response.w3.U3,
        name:response.w3.ig
      })
    }
    
  }

  selectHandler= (e)=>{
   // const val = e.target.value;
    this.setState({defaultSearch:e.target.value,books:null,isfound:false,isLoading:false,search:''})
  }

  logOut = (e)=>{
    e.preventDefault();
    this.setState({
      isLoggedIn:false,
      username:null,
      name:null
    })
    sessionStorage.clear(); 
  }

  changehandler = (e)=>{
    e.preventDefault();
    this.setState({search:e.target.value})
  }

  submitHandler = (e)=>{
    e.preventDefault();
    const q =encodeURI(this.state.search)
    this.setState({isLoading:true})
    if(this.state.defaultSearch ==='isbn'){
        console.log('hi')
        fetch('https://openlibrary.org/api/books?bibkeys=ISBN:'+q+'&jscmd=details&format=json')
        .then((response)=> {
          
          return response.json();
        })
        .then((myJson)=> {
          if(JSON.stringify(myJson) !== JSON.stringify({})){
            this.setState({books:myJson[`ISBN:${q}`],isLoading:false,isfound:true})
          }else{
            this.setState({books:[],isLoading:false,isfound:false})
          }
        });
      }else{
        fetch('http://openlibrary.org/search.json?title='+q)
        .then((response)=> {
          return response.json();
        })
        .then((myJson)=> {
          if(myJson.num_found>0){
            this.setState({books:myJson.docs,isloading:false,isfound:true})
          }else{
            this.setState({books:[],isLoading:false,isfound:false})
          }
        });
      }

  }

  render() {
    const values = {...this.state}
    let appContent;
    if(this.state.isLoggedIn){
      appContent = ( <div>
                            <Login login={this.responseGoogle} logout={this.logOut} values={values}/>
                            <Search submit={this.submitHandler} change={this.changehandler} val={this.state.search} select={this.selectHandler}/>
                            <Listing books={this.state.books} loading={this.state.isLoading} found={this.state.isfound} search={this.state.defaultSearch}/>
                        </div>
                        )
    }else{
      appContent = <Login login={this.responseGoogle} logout={this.logOut} values={values}/>
    }
    


    return (
      <div>
      <CssBaseline />
     
       {appContent} 
       
      </div>
    );
  }
}

export default App;
