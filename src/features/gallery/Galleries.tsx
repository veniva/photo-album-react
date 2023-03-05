import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';


export default function Galleries(): JSX.Element {

  const photos = useAppSelector(state => state.photos);

  return (
    <section>
        {photos.length}
    </section>
  );
}