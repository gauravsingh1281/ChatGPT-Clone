import { RouterProvider } from 'react-router';
import router from "./AppRouter";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/auth/authSlice';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App;

