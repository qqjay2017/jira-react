import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function About() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  console.log(params, "params");
  console.log(searchParams.get("test"), "searchParams");

  return <div>About</div>;
}

export default About;
