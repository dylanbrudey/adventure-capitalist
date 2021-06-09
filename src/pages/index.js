import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

const headerList = [
  'A la Une',
  'Politique',
  'Econnomie',
  'Sciences'
];

const footerList = [
  'Google',
  'Facebook',
  'Twitter',
  'Instagram'
];

const Page = ({ children }) => (
  <div>
    <Header listItem={headerList} />
    <main className="container">
      {children}
    </main>
    <Footer listItem={footerList} />
  </div>
);

export default Page;
