import { useLocation, Navigate } from 'react-router-dom';

import routs from '../../routs/routs';

export default function ReqAuth({ children }) {
  const location = useLocation();
  const auth = localStorage.getItem('token');
  if (!auth) {
    return <Navigate to={routs.singIn} state={{ from: location }} />;
  }
  return children;
}
