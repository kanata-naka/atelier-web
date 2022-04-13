import React, { FC } from "react";
import { useState } from "react";
import Router from "next/router";
import { Transition, TransitionStatus } from "react-transition-group";

const transitionStyle: { [state in TransitionStatus]?: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, visibility: "hidden" },
};

const RoutingEffect: FC = () => {
  const [loading, setLoading] = useState(false);

  // ルーティングのイベントに設定する
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <Transition
      in={loading}
      timeout={250}
      onEntered={() => {
        // スクロールを無効にする
        document.body.style.overflow = "hidden";
      }}
      onExit={() => {
        // スクロールを有効にする
        document.body.style.overflow = "scroll";
      }}
    >
      {(state) => (
        <div className="page-loading" style={transitionStyle[state]}>
          <img className="loading-image" src="/images/loading.svg" />
        </div>
      )}
    </Transition>
  );
};

export default RoutingEffect;
