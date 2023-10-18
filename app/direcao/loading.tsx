'use client';
import { PuffLoader } from 'react-spinners';
import Header from '../components/partials/Header';

const Loading = () => (
  <>
    <Header />
    <PuffLoader
      cssOverride={{ margin: '0 auto', marginTop: '1rem' }}
      color='#3646d6'
      size={270}
      className='m-auto mt-5'
    />
  </>
);

export default Loading;
