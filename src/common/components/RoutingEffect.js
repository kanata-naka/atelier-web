import { useState } from "react"
import Router from "next/router"
import { Transition } from "react-transition-group"

const transitionStyle = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, visibility: "hidden" }
}

const Component = () => {
  const [loading, setLoading] = useState(false)
  Component.setLoading = setLoading

  return (
    <Transition
      in={loading}
      timeout={250}
      onEntered={() => {
        document.body.style.overflow = "hidden"
      }}
      onExit={() => {
        document.body.style.overflow = null
      }}>
      {state => (
        <div className="page-loading" style={transitionStyle[state]}>
          <img className="loading-image" src="/images/loading.png" />
        </div>
      )}
    </Transition>
  )
}

const RoutingEffect = {
  Component,
  show: () => Component.setLoading(true),
  hide: () => Component.setLoading(false)
}

Router.events.on("routeChangeStart", () => RoutingEffect.show())
Router.events.on("routeChangeComplete", () => RoutingEffect.hide())
Router.events.on("routeChangeError", () => RoutingEffect.hide())

export default RoutingEffect
