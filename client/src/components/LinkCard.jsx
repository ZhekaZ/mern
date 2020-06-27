import React from 'react';
import { Loader } from './Loader';

export const LinkCard = ({ link }) => {
  console.log(link);

  if (!link) {
    return <Loader />;
  }

  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:{' '}
        <a href={link.to} target='_blank' rel='noopener noreferrer'>
          {link.to}
        </a>
      </p>
      <p>
        From:{' '}
        <a href={link.from} target='_blank' rel='noopener noreferrer'>
          {link.from}
        </a>
      </p>
      <p>
        Clicks counter: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date creation:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
