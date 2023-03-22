import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ProfileSvg = (props) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    {...props}>
    <Path
      d="M28 29v-2a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2"
      stroke="#212121"
      strokeOpacity={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M20 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="#212121"
      strokeOpacity={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
