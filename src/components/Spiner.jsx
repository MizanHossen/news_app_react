import React, { Component } from 'react'
import loading from "./loading.gif"


export default class Spinner extends Component {
    render() {
        return (

            <div className='text-center justify-content-center spinner_loader_container'>
                <img src={loading} alt="loading" />
            </div>
        )
    }
}

