import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const [count, setCount] = useState(5);

  let history = useHistory();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};
