import React from "react";

const SearchSvg = ({color = 'rgba(255,255,255, 0.87)'}) => {
    return (
        <div className='svg-wrapper'>
            <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z" fill={color}/>
                <path d="M0,0h24v24H0V0z" fill="none"/>
            </svg>
        </div>
    );
};

export default SearchSvg;