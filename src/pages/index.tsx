import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Home: React.FC = () => {
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    axios.get('http://200.56.97.5:7281/api/Estados')
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los estados:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      const url = `http://200.56.97.5:7281/api/Viaticos/Ciudades/Estado/${selectedState}`;
      axios.get(url)
        .then(response => {
          setCities(response.data.data);
        })
        .catch(error => {
          console.error('Error al obtener los datos de las ciudades:', error);
        });
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const stateOptions = states.map(state => ({
    value: state.idEstado,
    label: state.estado
  }));

  const cityOptions = cities.map(city => ({
    value: city.idCiudad,
    label: city.ciudad
  }));

  const handleStateChange = (selectedOption: any) => {
    setSelectedState(selectedOption?.value || '');
  };

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption?.value || '');
  };

  return (
    <div className="container">
      <h1>Lista de Estados y Ciudades</h1>

      <div className="dropdown-container">
        <label htmlFor="state-select">Estado</label>
        <Select
          id="state-select"
          options={stateOptions}
          onChange={handleStateChange}
          placeholder="Buscar estado..."
          isClearable
        />
      </div>

      <div className="dropdown-container">
        <label htmlFor="city-select">Ciudad</label>
        <Select
          id="city-select"
          options={cityOptions}
          onChange={handleCityChange}
          placeholder="Buscar ciudad..."
          isClearable
          isDisabled={cities.length === 0}
        />
      </div>
    </div>
  );
};

export default Home;
