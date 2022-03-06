import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../Actions";
import StreamForm from "./StreamForm";
class StreamEdit extends Component {
  // console.log(this.props.streams);
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          initialValues={{
            title: `${this.props.stream.title}`,
            description: `${this.props.stream.description}`,
          }}
          onSubmit={this.onSubmit}
        />
      </div>
      // <div>{this.props.stream.title}</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
