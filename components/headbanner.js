import React from 'react';
import Image from 'next/image';

export default function HeadBanner(props) {
  return (
    <div>
      <div className="flex justify-center card sm:grid-cols-1">
        <Image src={props.img1} alt="banner" width={1500} height={200} />
      </div>
    </div>
  );
}
