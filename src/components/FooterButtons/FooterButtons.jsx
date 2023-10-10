import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";

export const FooterButtons = ({ link, showButtonCondition }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && (
        <Button onClick={() => navigate(-1)}>Back</Button>
      )}
      {showButtonCondition && (
        <Link to={link}>
          <Button size="large" type="primary">
            Дальше
          </Button>
        </Link>
      )}
      <Link to={link}>
        <Button size="small" danger>
          Дальше (правильного ответа не существует)
        </Button>
      </Link>
    </div>
  );
};
