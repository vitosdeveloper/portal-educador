'use client';
import { SkewLoader } from 'react-spinners';

const Loading = ({ loading }: { loading: boolean }) => {
  if (loading)
    return <SkewLoader cssOverride={{ margin: '0 auto' }} color='#1976d2' />;
};

export default Loading;
