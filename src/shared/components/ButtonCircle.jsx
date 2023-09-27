import React from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

export  const ButtonCircle = ({
    type= "btn", onClick, icon ="", size=15
}) => {
  return (
    <button className={type} onClick={onClick}>
          {icon &&(
        <FeatherIcon icon={icon} size={size}
        style={{strokeWidth:2.5}}/>
    )}
    </button>


  )
}