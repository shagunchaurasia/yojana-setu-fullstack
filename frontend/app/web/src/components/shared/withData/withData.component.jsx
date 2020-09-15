import React, { Component } from "react";
import { SpinnerOverlay, SpinnerContainer } from "./withData.style";
import axios from "axios";

const withData = (WrappedComponent, dataSource) => {
  class withData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: [],
      };
    }

    componentDidMount() {
      let self = this;
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDJlMDc0NjNjMmEzMjI2NjNkYTY3NCIsImlhdCI6MTU5ODcxNjgzMCwiZXhwIjoxNjAwNTE2ODMwfQ.0fAT9Nn2XAJ74CJxPZoFxFqbf3gRFSch6z_myVS8-4w`,
        },
      };
      axios.get(dataSource, config).then((response) => {
        console.log(dataSource);
        console.log(response);
        self.setState({
          isLoading: false,
          data: response.data.data,
        });
      });
    }
    render() {
      return this.state.isLoading ? (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      ) : (
        <WrappedComponent
          data={this.state.data}
          {...this.props}
        ></WrappedComponent>
      );
    }
  }
  return withData;
};

export default withData;
