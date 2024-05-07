import React, { Component } from 'react'
import loading from "./loading.gif"


const Spinner = () => {
    return (

        <div className='text-center justify-content-center spinner_loader_container'>
            <img src={loading} alt="loading" />
        </div>
    )

}

export default Spinner

