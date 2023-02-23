import React from "react";
import { COPYRIGHT } from "@/constants";

function Footer() {
  return (
    <footer className="site-footer">
      <Copyright />
    </footer>
  );
}

function Copyright() {
  return <div className="copyright">{COPYRIGHT}</div>;
}

export default Footer;
