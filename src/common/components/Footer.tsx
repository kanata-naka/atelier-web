import React from "react";
import { COPYRIGHT } from "../models";

/** フッター */
export default () => {
  return (
    <footer className="site-footer">
      <div className="copyright">{COPYRIGHT}</div>
    </footer>
  );
};
