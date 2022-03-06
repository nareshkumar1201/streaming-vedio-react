
import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';


class StreamForm extends Component{
  
  renderError =({error,touched})=>{
             if(touched){
                  if(error){
                     return (
                       <div className="ui error message">
                        <div className="header">
                          {error}
                        </div>
                         </div>
                     );
                  }

             }
  }

   renderInput=({input,label,meta})=>{
     console.log(meta);
     const classInfo=`field ${meta.error && meta.touched ? 'error' :''}`
    return(
      <div>
        {/* <input onChange={formProps.input.onChange} 
        value={formProps.input.value}/> */}
        {/* <input {...formProps.input}/> */}
        <div className={classInfo}>
          <label>{label}</label>
        <input {...input} />
        {/* {meta.error} */}
        {this.renderError(meta)}
        </div>
      </div>
    )
   }

   onSubmit =(formValues)=>{
      console.log(formValues);
       this.props.onSubmit(formValues);
   }

   render(){
     return(
       <div>
         <form className="ui form" 
         onSubmit={this.props.handleSubmit(this.onSubmit)}>
           <Field type ="input" 
           name="title" 
           component={this.renderInput}
           label="Enter Title : "
           />
           <Field type="input" 
           name="description" 
           component={this.renderInput}
           label="Enter Description : "/> <br/>
           <button className="ui button primary">SUBMIT</button>
         </form>
       </div>
     )
   }
}

const validateForm=(formValues)=>{
  console.log(formValues)
      const errors={}
      if(!formValues.title){
         errors.title="Please Enter a Valid Title"
      }

      if(!formValues.description){
         errors.description="Please Enter a Valid Description"
      }

      return errors;
}


export default reduxForm({
  form:'streamForm',
  validate:validateForm
})(StreamForm);

