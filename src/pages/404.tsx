import styles from './404.module.css';

const Page404 = () => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.description}>Oops! Página não encontrada</p>
        <p className={styles.subDescription}>
          A página que procura pode ter sido removida, o seu nome alterado ou estar temporariamente indisponível.
        </p>
        <img
          src="/assets/404.svg"
          alt="404 illustration"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export { Page404 };
