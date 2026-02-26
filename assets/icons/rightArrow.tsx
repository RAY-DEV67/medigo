import React from "react";
import Svg, { Path } from "react-native-svg";

interface SearchProps {
  color?: string;
}

const RightArrow: React.FC<SearchProps> = ({ color = "#BFBFBF" }) => {
  return (
    <Svg width={6} height={10} viewBox="0 0 6 12" fill="none">
      <Path
        d="M0.75 0.75L4.75 5.75L0.75 10.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default RightArrow;
