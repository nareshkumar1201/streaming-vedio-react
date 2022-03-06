import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import { fetchStreams } from '../../Actions';


class StreamList extends Component{

  componentDidMount(){
      this.props.fetchStreams();
  } 
  renderUpdate=(stream)=>{
    if(stream.userId === this.props.currentUserId){
      return(
        <div className="right floated content"> 
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
        EDIT
        </Link>
        <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
          DELETE
        </Link>
        
        </div>
      )
    }
    
  }
  renderList=()=> {
    return this.props.streamsList.map(stream=>{
         return (
           <div className="item" key={stream.id}>
              {this.renderUpdate(stream)}
              <i className="large middle aligned icon camera" />
              <div className="content">
                <Link to={`/streams/${stream.id}`} className="header">
                {stream.title}
                </Link>
                <div className="description">{stream.description}</div> 
              </div>
           </div>
         )
    });
  }
  
  renderCreate=()=>{
     if(this.props.isSignedIn){
       return(
         <div style={{textAlign:'right'}}>
          <Link to="/streams/create" className="ui button primary">New Stream</Link>
         </div>
       )
     }
  }

  render(){
    console.log(this.props.streamsList);
      
      return(   
        <div>
          
          <h2>Streams</h2>
          <div className="ui celled list">
         {this.renderList()}
          </div>
          {this.renderCreate()}
          </div>
      );
    }
}

const mapStateToProps=(state)=>{
      return {
         streamsList:Object.values(state.streams),
         currentUserId: state.auth.userId,
         isSignedIn : state.auth.isSignedIn
      }
}


export default connect(mapStateToProps, {fetchStreams})(StreamList);

