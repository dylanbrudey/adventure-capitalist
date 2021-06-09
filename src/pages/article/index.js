import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import data from '../../components/data';
import Page from '..';
import Comments from './comments';

const Article = () => {
  const { id } = useParams();
  const itemSelected = data[id] || {};

  if (!Object.keys(itemSelected).length) {
    return (<Redirect to={{ pathname: '/' }} />);
  }

  const { title, img, content } = itemSelected;

  return (
    <Page>
      <div className="row mt-5">
        <div className="col-12">
          <h3>{title}</h3>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-4">
          <img src={img} alt="img" width="100%" />
        </div>
        <div className="col-8">
          <p>{content}</p>
        </div>
      </div>
      <Comments id={id} />
    </Page>
  );
};

export default Article;
