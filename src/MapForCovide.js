import React from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';
import Chart from 'chart.js/auto';
import L from 'leaflet';

const Dashboard = () => {
  const fetchWorldData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    const data = await response.json();
    return data;
  };

  const fetchCountryData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    const data = await response.json();
    return data;
  };

  const fetchGraphData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    const data = await response.json();
    return data;
  };

  const worldDataQuery = useQuery('worldData', fetchWorldData);
  const countryDataQuery = useQuery('countryData', fetchCountryData);
  const graphDataQuery = useQuery('graphData', fetchGraphData);

  const renderWorldData = () => {
    if (worldDataQuery.isLoading) {
      return <p>Loading...</p>;
    }

    if (worldDataQuery.isError) {
      return <p>Error loading worldwide data</p>;
    }

    const { cases, deaths, recovered } = worldDataQuery.data;
    return (
      <div>
        <h2>Worldwide Cases</h2>
        <p>Total Cases: {cases}</p>
        <p>Total Deaths: {deaths}</p>
        <p>Total Recovered: {recovered}</p>
      </div>
    );
  };

  const renderLineGraph = () => {
    if (graphDataQuery.isLoading) {
      return <p>Loading...</p>;
    }

    if (graphDataQuery.isError) {
      return <p>Error loading graph data</p>;
    }

    const graphLabels = Object.keys(graphDataQuery.data.cases || {});
    const graphCases = Object.values(graphDataQuery.data.cases || {});

    const lineGraphConfig = {
      labels: graphLabels,
      datasets: [
        {
          label: 'Cases',
          data: graphCases,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };

    return (
      <div>
        <h2>Line Graph - Cases Fluctuations</h2>
        <Line data={lineGraphConfig} />
      </div>
    );
  };

  const renderCountryDataMap = () => {
    if (countryDataQuery.isLoading) {
      return <p>Loading...</p>;
    }

    if (countryDataQuery.isError) {
      return <p>Error loading country data</p>;
    }

    return (
      <div>
        <h2>Country Data</h2>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryDataQuery.data.map((country) => (
           <Marker
           key={country.country}
           position={[country.countryInfo.lat, country.countryInfo.long]}
           icon={L.icon({
             iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
             iconSize: [25, 41],
             iconAnchor: [12.5, 41],
             popupAnchor: [0, -41],
             shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
             shadowSize: [41, 41],
             shadowAnchor: [12.5, 41],
           })}
         >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Total Cases: {country.cases}</p>
                  <p>Total Deaths: {country.deaths}</p>
                  <p>Total Recovered: {country.recovered}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  };

  return (
    <div className='MapForCovide'>
      {renderWorldData()}
      {renderLineGraph()}
      {renderCountryDataMap()}
    </div>
  );
};

export default Dashboard;