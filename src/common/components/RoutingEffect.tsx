import React, { ReactElement } from "react";
import { useState } from "react";
import Router from "next/router";
import { Transition, TransitionStatus } from "react-transition-group";

const transitionStyle: { [state in TransitionStatus]?: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, visibility: "hidden" },
};

const RoutingEffect: {
  Component: () => ReactElement;
  show: () => void;
  hide: () => void;
} = {
  Component: () => {
    const [loading, setLoading] = useState(false);
    RoutingEffect.show = () => setLoading(true);
    RoutingEffect.hide = () => setLoading(false);

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
        }}>
        {(state) => (
          <div className="page-loading" style={transitionStyle[state]}>
            <img className="loading-image" src="/images/loading.svg" />
          </div>
        )}
      </Transition>
    );
  },
  show: () => {},
  hide: () => {},
};

Router.events.on("routeChangeStart", () => RoutingEffect.show());
Router.events.on("routeChangeComplete", () => RoutingEffect.hide());
Router.events.on("routeChangeError", () => RoutingEffect.hide());

export default RoutingEffect;
