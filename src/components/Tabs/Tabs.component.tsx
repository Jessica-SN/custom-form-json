import { FC, ReactNode, useEffect, useState } from 'react';
import styles from './Tabs.module.sass';

type TabItem = {
  id: string;
  title: string;
  isActive: boolean;
  children: ReactNode;
};

interface Props {
  items: TabItem[];
}

export const Tabs: FC<Props> = ({ items }) => {
  const [activeTabId, setActiveTabId] = useState<string>('');

  useEffect(() => {
    items.forEach((item) => {
      if (item.isActive) setActiveTabId(item.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.header}>
        {items.map(({ id, title }) => (
          <button
            key={`button-${id}`}
            className={styles.tabButton}
            disabled={id === activeTabId}
            onClick={() => setActiveTabId(id)}
          >
            {title}
          </button>
        ))}
      </div>

      <div className={styles.itemsWrapper}>
        {items.map(({ id, children }) => (
          <div
            key={`tab-${id}`}
            className={`${styles.tabContent} ${
              id === activeTabId ? styles.isActive : styles.isHidden
            }`}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};
