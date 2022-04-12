import React, { FC } from "react";
import { COPYRIGHT } from "../models";

const Footer: FC = () => {
  return (
    <footer className="site-footer">
      <div className="copyright">{COPYRIGHT}</div>
    </footer>
  );
};

export default Footer;
