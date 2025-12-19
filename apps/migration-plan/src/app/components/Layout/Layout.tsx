import { FC, ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;



