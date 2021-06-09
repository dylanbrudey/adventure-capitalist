import React from 'react';

const ItemMenu = ({ title }) => (
  <li className="nav-item">
    <span className="nav-link" href="#">{title}</span>
  </li>
);

const Footer = ({ listItem }) => (
  <header className="mt-5">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {listItem.map((title) => <ItemMenu title={title} />)}
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Footer;
