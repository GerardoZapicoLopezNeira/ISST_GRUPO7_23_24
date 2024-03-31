import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9090/api/v1/herramientas');
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div>
      <h2>Search Tools</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
        />
        <button onClick={fetchTools} disabled={!searchTerm || loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div>
        {tools.length > 0 ? (
          <ul>
            {tools.map(tool => (
              <li key={tool.id}>
                <h3>{tool.tipo}</h3>
                <p>Description: {tool.descripcion}</p>
                <p>Price: ${tool.precioDiario}</p>
                <p>Availability: {tool.disponibilidad ? 'Available' : 'Not Available'}</p>
                <p>Condition: {tool.estadoFisico}</p>
                <p>Owner: {tool.id_propietario}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{loading ? 'Searching...' : 'No tools found.'}</p>
        )}
      </div>
    </div>
  );
}

export default SearchTools;
