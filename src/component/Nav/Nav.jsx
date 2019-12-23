import React from 'react';
import YouTubeLogo from './images/YouTubeLogo.png'


const Nav = props=>{
  return (
    <div>
      <nav>
        <a href="/">
          <img src={YouTubeLogo} alt={YouTubeLogo}/>
        </a>
        
        {props.children}
      </nav>

    </div>

  )
}
export default Nav;