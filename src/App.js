import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress, Modal, Typography } from '@mui/material';
import { UserContext } from './context/user';
import Navbar from './components/elements/Navbar';
import Main from './components/Main';
import Auth from './components/Auth';
import Maps from './components/Maps';
import Pet from './components/Pet';
import Newpost from './components/Newpost';
import Catalog from './components/Catalog';
import Profile from './components/Profile';
import Favor from './components/Favor';
import Private from "./Private";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const { user, loading } = useContext(UserContext);
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    let pingText = '';

    (async function sendPing() {
      const pingResponse = await fetch(`${BASE_URL}/ping`);
      if (pingResponse.ok) {
        pingText = await pingResponse.text();
        if (pingText === "ping") setBackdropOpen(false);
      }
    }());

    setTimeout(() => {
      if (pingText !== "ping") {
        setBackdropOpen(true);
      }
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lost" element={<Maps filter="lost" />} />
        <Route path="/found" element={<Maps filter="found" />} />
        <Route path="/pet/:id" element={<Pet />} />
        <Route path="/catalog" element={<Catalog />} />

        <Route path="/auth" element={<Private isAllowed={!user?.id} isLoading={loading} redirectTo="/"><Auth /></Private>} />
        <Route path="/authnewpost" element={<Private isAllowed={!user?.id} isLoading={loading} redirectTo="/"><Auth isNewPost /></Private>} />

        <Route path="/newpost" element={<Private isAllowed={!!user?.id} isLoading={loading} redirectTo="/auth"><Newpost /></Private>} />
        <Route path="/profile" element={<Private isAllowed={!!user?.id} isLoading={loading} redirectTo="/auth"><Profile /></Private>} />
        <Route path="/profile/favor" element={<Private isAllowed={!!user?.id} isLoading={loading} redirectTo="/auth"><Favor /></Private>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, maxWidth: '35rem' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ width: '100%', mt: '2rem' }} variant="h6" gutterBottom>Пожалуйста, подождите — данные загружаются</Typography>
          <Typography sx={{ width: '100%' }} variant="body2" gutterBottom>Из-за того что проект размещён на бесплатном сервере — начальная загрузка может длиться до 30-60 секунд. Извините :&#41;</Typography>
        </div>
      </Backdrop>

      <div className="toastify">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default App;
