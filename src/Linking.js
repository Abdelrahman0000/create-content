
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateContent from './CreateContent.tsx';
import MapForCovide from './MapForCovide';
import Sidebar from './Sidebar.jsx';

export default function Linking() {
  return (
    <BrowserRouter>
    <Sidebar />
      <Routes>
        <Route path="/" element={<CreateContent />} />
        <Route path="/mapForCovide" element={<MapForCovide />} />
      </Routes>
    </BrowserRouter>
  );
}