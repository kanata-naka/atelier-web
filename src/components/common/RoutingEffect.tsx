import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { Transition, TransitionStatus } from "react-transition-group";

const transitionStyle: { [state in TransitionStatus]?: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, visibility: "hidden" },
};

function RoutingEffect() {
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
        document.body.style.overflow = "hidden";
      }}
      onExit={() => {
        document.body.style.overflow = "scroll";
      }}
    >
      {(state) => (
        <div className="page-loading" style={transitionStyle[state]}>
          <Image className="loading-image" src="/images/loading.svg" width={64} height={64} alt="Loading..." />
        </div>
      )}
    </Transition>
  );
}

export default RoutingEffect;
