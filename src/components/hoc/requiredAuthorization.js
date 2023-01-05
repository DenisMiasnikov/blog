import { useLocation, Navigate } from 'react-router-dom';

export default function ReqAuth({ children }) {
  const location = useLocation();
  const auth = localStorage.getItem('token');
  if (!auth) {
    console.log(auth);
    return <Navigate to="/sing-in" state={{ from: location }} />;
  }
  console.log(children);
  return children;
}
