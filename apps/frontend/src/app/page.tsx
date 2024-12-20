'use client';

import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <h1>Hello!</h1>
        </div>
      </div>
    </div>
  );
}
