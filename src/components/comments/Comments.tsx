import React from 'react';
import { Comment } from './comment/Comment';
import { Container } from '@material-ui/core';

type PropsType = {
  commentIds: number[];
};

export const Comments: React.FC<PropsType> = React.memo(({ commentIds }) => {
  return (
    <>
      <Container
        style={{
          padding: '5px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h6>Comments</h6>
        {commentIds.slice(0, 100).map((id, i) => (
          <div key={i} style={{ marginBottom: '30px', paddingLeft: '20px', background: 'white' }}>
            <Comment comment={id} />
          </div>
        ))}
      </Container>
    </>
  );
});
