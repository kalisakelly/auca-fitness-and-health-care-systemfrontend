import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100x auto' 
}

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color=''
      loadong={loading}
      cssOverride={override}
      size={150} 

    />
  )
}

export default Spinner