import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <h1>Welcome!</h1>
      <Routes>
        <Route path="/" element={<div>home!</div>} />
        <Route path="app" element={<div>app!</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
