import React from 'react';
export default function NotFound(){
    return (
        <main>
            <div className='wrap'>
            <div className="center-div">
                <h2>Page Not Found</h2>
                <p>The page you requested cannot be found. Try to go back to the course list?</p>
                <a className="button button-secondary" href='/'>Go back</a>
            </div>
            </div>
        </main>
    )
}