import useSelection from "antd/lib/table/hooks/useSelection";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../api";

export default () => {
  const { slug } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    api.category
      .getCategory(slug, token)
      .then(({ data }) => setCurrentCategory(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Category Update</h1>
      {currentCategory && <div>{currentCategory.name}</div>}
    </div>
  );
};
