import { Link } from "react-router-dom";

import { CardLinkIF } from "src/interfaces";

export const CardLink = ({ path, text }: CardLinkIF) => {
  return (
    <>
      <Link
        to={path}
        style={{
          color: "white",
          fontSize: 18,
          // fontWeight: "normal",
          textDecoration: "none",
          fontFamily: "Roboto",
        }}
      >
        {text}
      </Link>
    </>
  );
};
