import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/error404.module.scss";
const { errorContainer, mars, logo404, meteor, title, subtitle, btnBlack, astronaut, spaceship } = styles;

function Error404() {
  const navigate = useNavigate();

  return (
    <div className={errorContainer}>
      <div className={mars}></div>

      <img src="https://assets.codepen.io/1538474/404.svg" className={logo404} />
      <img src="https://assets.codepen.io/1538474/meteor.svg" className={meteor} />
      
      <p className={title}>Oh no!!</p>

      <p className={subtitle}>
        You’re either misspelling the URL <br /> or requesting a page that's no longer here.
      </p>
      
      <div align="center">
        <a className={btnBlack} href="#" onClick={() => navigate(-1)}>Back to Previous Page</a>
      </div>
      
      <img src="https://assets.codepen.io/1538474/astronaut.svg" className={astronaut} />
      <img src="https://assets.codepen.io/1538474/spaceship.svg" className={spaceship} />
    </div>
  );
}

export default Error404;
