import React from 'react'
import videoBg from '../assets/Bg.mp4'

const Video = () => {
  return (
    <div className='h-full w-full'>
      <video
        className='h-full w-full object-cover'
        autoPlay
        loop
        muted
        playsInline
        src={videoBg}
      ></video>
    </div>
  )
}

export default Video