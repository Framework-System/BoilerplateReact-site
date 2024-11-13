import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate('/');

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <img src="/assets/404.svg" alt="404" />
      <button type="button" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export { Page404 };
