// Contact.js
import { FormatItalic } from '@mui/icons-material';
import React from 'react';

const Contact = () => {
  return (
    <div className='contact'>
      <h2 className='about'>¡Contacta con nosotros!</h2>
      <div className='buscar '>
      <p>Si tienes cualquier pregunta, no dudes en contactarnos.</p>
      <p>Email: info@diy4rent.com</p> 
      <a href="https://www.gmail.com" className="homeIcon"><img src="/coreo.png" className='iconsHome'/></a>
                
      </div>
   
    </div>
  );
};

export default Contact;
