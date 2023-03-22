import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const PostsSvg = (props) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      d="M8 8h24v24H8z"
    />
    <Path
      clipRule="evenodd"
      d="M11 11h7v7h-7v-7ZM22 11h7v7h-7v-7ZM22 22h7v7h-7v-7ZM11 22h7v7h-7v-7Z"
      stroke="#212121"
      strokeOpacity={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
