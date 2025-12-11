import React, { FC } from 'react';
import classNames from 'classnames';
import { Card } from '../Card';
import styles from './ArticleList.module.scss';

export interface Article {
  title: string;
  readTime: string;
  onClick?: () => void;
}

export interface ArticleListProps {
  title?: string;
  articles: Article[];
  className?: string;
}

export const ArticleList: FC<ArticleListProps> = ({
  title = 'TOP READS',
  articles,
  className,
}) => {
  return (
    <Card className={classNames(styles.articleList, className)}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {articles.map((article, index) => (
          <li key={index} className={styles.item}>
            <button className={styles.articleButton} onClick={article.onClick}>
              <span className={styles.icon}>📄</span>
              <span className={styles.articleTitle}>{article.title}</span>
              <span className={styles.readTime}>({article.readTime})</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

