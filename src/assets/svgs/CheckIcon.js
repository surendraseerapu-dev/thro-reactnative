import React from 'react';
import {Path, Svg} from 'react-native-svg';

function CheckIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000"
      strokeWidth="1.5"
      className="size-6"
      viewBox="0 0 40 40">
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></Path>
    </Svg>
  );
}

export default CheckIcon;
