import React, { useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Router from "next/router";
import { Transition, TransitionStatus } from "react-transition-group";
import { loadingImageKeyframes } from "@/styles";

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
        document.body.classList.add("no-scroll");
      }}
      onExit={() => {
        document.body.classList.remove("no-scroll");
      }}
    >
      {(state) => (
        <div
          css={css`
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            transition: opacity 250ms;
          `}
          style={transitionStyle[state]}
        >
          <Image
            src="/images/loading.svg"
            width={64}
            height={64}
            alt="Loading..."
            css={css`
              display: block;
              transform: translate(-50%, -50%);
              animation: ${loadingImageKeyframes} 2s linear infinite;
            `}
          />
        </div>
      )}
    </Transition>
  );
}

export default RoutingEffect;
