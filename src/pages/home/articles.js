import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ item, id }) => {
  const { title, description, img } = item;

  return (
    <div className="col-4 mt-5">
      <div className="card">
        <img src={img} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <Link className="btn btn-primary" to={`/article/${id}`}>Lire article</Link>
        </div>
      </div>
    </div>
  );
};

const Articles = ({ data }) => (
  <div className="row">
    {data.map((item, id) => (<Article id={id} item={item} />))}
  </div>
);

export default Articles;
