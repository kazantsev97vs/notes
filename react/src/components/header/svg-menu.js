import React from "react";

const Menu = ({color = 'white'}) => {
    return (
        <div className='svg-wrapper'>
            <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color}/>
            </svg>
        </div>
    );
};

export default Menu;