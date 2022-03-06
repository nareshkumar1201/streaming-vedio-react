import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from "../../Actions";
import flvjs from 'flv.js';
class StreamShow extends Component {
   constructor(props){
     super(props);
     this.videoRef=React.createRef();
   }
  componentDidMount(){
    const {id} = this.props.match.params
    this.props.fetchStream(id)
    this.buildPlayer();
  }

  componentDidUpdate(){
    this.buildPlayer();
  }

  componentWillUnmount=()=>{
    this.flvPlayer.destroy();
  }

  buildPlayer =()=>{
    const {id} = this.props.match.params
    if(this.flvPlayer || !this.props.stream){
         return;
    }
    this.flvPlayer= flvjs.createPlayer({
      type:'flv',
      url:`http://localhost:8000/live/${id}.flv`
    })

    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();
  }
  render(){
    if(!this.props.stream){
      return <div> Loading.... </div>
    }
    const {title,description} = this.props.stream
    return(
      <div>
        <video ref={this.videoRef} style={{width:'100%'}} controls/>
        <h2>{title}</h2>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStateToProps=(state,ownProps)=>{
  return{
    stream:state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, {fetchStream}) (StreamShow);