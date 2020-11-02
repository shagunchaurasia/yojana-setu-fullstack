import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./withSpinner.style";

const WithSpinner = (WrappedComponent) => {
  console.log("Spinner here");
  const Spinner = ({ isLoading, ...otherProps }) => {
    console.log("isLoading");
    console.log(isLoading);
    console.log("otherprops");
    console.log(otherProps);

    return isLoading == true ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <div>
        <WrappedComponent {...otherProps} isLoading={isLoading} />
      </div>
    );
  };
  return Spinner;
};

export default WithSpinner;
