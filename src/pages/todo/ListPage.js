import React from "react";
import { useSearchParams } from "react-router-dom";

const ListPage = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  console.log(urlSearchParams);
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;
  const size = urlSearchParams.get("size")
    ? parseInt(urlSearchParams.get("size"))
    : 10;
  return (
    <h1>
      ListPage page:{page}, size:{size}
    </h1>
  );
};

export default ListPage;
