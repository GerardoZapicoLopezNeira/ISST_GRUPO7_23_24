// Footer.js
import React, { useState, useEffect } from 'react';

const Footer = () => {
  return (
    <div className="footer-css">
     <div>
     <h2 className="fot">Grupo07 - DIY4Rent</h2>
     <div className="footer_links">
                
               <h3>Conecta con nosotros</h3>
               <a href="https://www.facebook.com" className="icons"><img src="/facebook.png" className='icons'/></a>
                <a href="https://www.twitter.com" className="icons"><img src="/x.png" className='icons'/></a>
                <a href="https://www.youtube.com" className="icons"><img src="/yt.png" className='icons'/></a>
                <a href="https://www.instagram.com" className="icons"><img src="/insta.png" className='icons'/></a>
                
            </div>
     </div>
     <p className='copyright'>Copyright ©2024 Ingenieria de Sistemas y Servicios Telemáticos, Inc. Todos los derechos reservados a DIY4Rent INC.</p>
    </div>
    
  );  
};

export default Footer;
