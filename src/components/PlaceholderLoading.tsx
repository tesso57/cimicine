import React from "react";
import ContentLoader from "react-content-loader";
const PlaceholderLoading = () => {
  return (
    <div>
      <ContentLoader
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <rect width="100" height="40"></rect>
      </ContentLoader>
    </div>
  );
};

export default PlaceholderLoading;
