import { useNavigate } from 'react-router-dom';
import styles from './404.module.css';

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate('/');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>Oops! Página não encontrada</p>
        <p className={styles.subDescription}>
          A página que procura pode ter sido removida, o seu nome alterado ou estar temporariamente indisponível.
        </p>
        <img
          src="/assets/404.svg"
          alt="404 illustration"
          className={styles.image}
        />
        <button
          type="button"
          onClick={handleBackToHome}
          className={styles.button}
        >
          Volte
        </button>
      </div>
    </div>
  );
};

export { Page404 };
