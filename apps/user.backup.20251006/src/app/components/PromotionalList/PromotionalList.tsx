import translate from 'counterpart';
import React, { useState } from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import articles from './Articles.json';
import clock from './Clock.svg';
import DocumentIcon from './Document';
import { Container, Min, Post, TextContainer, TimeToRead, Title } from './styles';

const { domain } = APP_CONFIG;

export const PromotionalList = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const postList = articles.find((a) => a.domain === domain);

    if (!postList) return <></>;

    return (
        <Container>
            <Title>{translate('Top reads')}</Title>
            {postList &&
                postList.articles.map((post) => {
                    return (
                        <Post
                            isHovered={hoveredItem === post.name}
                            key={post.name}
                            href={post.url}
                            onMouseOver={() => setHoveredItem(post.name)}
                            onMouseOut={() => setHoveredItem(null)}
                            data-qa={`promotional-list-article-${post.id}`}
                        >
                            <DocumentIcon />
                            <TextContainer> {post.name} </TextContainer>
                            <TimeToRead>
                                <img src={clock} />
                                <Min>{`${post.time} min`}</Min>
                            </TimeToRead>
                        </Post>
                    );
                })}
        </Container>
    );
};
