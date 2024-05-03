// About.js
import React from 'react';

const About = () => {
  return (
	<div>
	  <h2 className='about'>Conoce algo más de DIY4Rent</h2>

		  <table border="0" className='tabla'>
  <tr>
    <td><h3>Nuestra historia</h3></td>
    <td><h3>Nuestros valores</h3></td>
  </tr>
  <tr>
    <td><p> En el mundo acelerado de hoy, la optimización del espacio y la economía son más importantes que nunca. Así surge DIY4Rent: en la asignatura de Ingeniería de Sistemas y Servicios Telemáticos, nos hemos unido en equipo para crear esta plataforma que conecta a propietarios de herramientas con personas que las necesitan. Nuestro objetivo es facilitar un intercambio eficiente y rentable, donde los anunciantes pueden monetizar sus herramientas subutilizadas y los usuarios pueden acceder a lo que necesitan sin tener que realizar una inversión completa.
			</p></td>
    <td><p>
			  Además, estamos comprometidos con la sostenibilidad ambiental al fomentar el uso de herramientas de segunda mano, reduciendo así la necesidad de nuevas producciones y promoviendo prácticas más ecológicas. Únete a nosotros en nuestro viaje para transformar la forma en que compartimos recursos y contribuimos a un mundo más sostenible. ¡Juntos, podemos construir un futuro más brillante, herramienta por herramienta!
			</p></td>
  </tr>
</table>
	<div className='about'>
<	img src="/logo.png" /></div>
    </div>
	
  );
};

export default About;
