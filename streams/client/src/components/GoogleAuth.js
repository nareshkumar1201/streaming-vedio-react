import React,{Component} from "react";
import {connect} from  'react-redux';
import {signIn,signOut} from "../Actions";
class GoogleAuth extends Component{
  // state={isSignedIn:null}
  componentDidMount(){
    window.gapi.load('client:auth2',()=>{
      window.gapi.client.init({
        clientId:`635499267510-sipd6u6fod55901362qbohue9in7n76g.apps.googleusercontent.com`,
        scope:`email`
      }).then(()=>{
        this.auth=window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        // this.setState({
        //   isSignedIn: this.auth.isSignedIn.get()
        // });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    })
  }

  onAuthChange=(isSignedIn)=>{
    if(isSignedIn){
       this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  }

  onSignInClick =()=>{
    this.auth.signIn();
  }

  onSignOutClick=()=>{
  this.auth.signOut();
  }

  renderAuthButton(){
    if(this.props.isSignedIn ===null){
          return <div>i dont know if you r loged in</div>
    }else if(this.props.isSignedIn){
         return (
           <button onClick={this.onSignOutClick} className="ui red google button">
           <i className="google icon"/>Sign Out
           </button>
         )
    }else{
      console.log(this.props.isSignedIn);
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
        <i className="google icon"/>Sign In
        </button>
      )
    }
  }
  render(){
      return(
          <div>{this.renderAuthButton()}</div>
      );
  }
} 

const mapStateToProps=(state)=>{
  return{
     isSignedIn:state.auth.isSignedIn
  }
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);