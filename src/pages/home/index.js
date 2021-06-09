import React from 'react';

import data from '../../components/data';
import Page from '..';
import Articles from './articles';

const Home = () => (
  <Page>
    <Articles data={data} />
  </Page>
);

export default Home;
