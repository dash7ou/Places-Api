import React from 'react';

import './Avatar.css';

const Avatar = {className, image, width, style, alt} => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;
