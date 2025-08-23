import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ smooth = false }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null;
};

export default ScrollToTop;