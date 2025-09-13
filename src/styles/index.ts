import { keyframes } from "@emotion/react";

// ※iPad (11インチ)に準拠
export const responsiveBoundaryWidth = 834;

export const siteHeaderHeight = 54;

export const frameBorderColor = "#dbdbdb";

export const modalResponsiveBoundaryWidth = 414;

export const loadingImageKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  35% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  60% {
    transform: rotate(270deg);
  }
  75% {
    transform: rotate(270deg);
  }
  85% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
