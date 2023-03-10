import { FolderTwoTone } from "@ant-design/icons";
import { Avatar } from "antd";
import { useMemo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Photo } from "./gallerySlice";
import styled from "styled-components";

type Props = {
  setPageTitle: (title: string) => void;
};
export default function Galleries({ setPageTitle }: Props): JSX.Element {
  const photos = useAppSelector((state) => state.gallery.photos);
  const albumIds = useMemo(() => extractAlbums(photos), [photos]);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("List of Galeries");
  }, []);

  const goToGallery = (id: number) => {
    navigate(`gallery/${id}`);
  };

  return (
    <GalleriesContainer>
      <Album albumId={0} isFavourite />
      {albumIds.map((albumId, i) => (
        <Album key={i} albumId={albumId} />
      ))}
    </GalleriesContainer>
  );
}

type AlbumProps = {albumId: number, isFavourite?: boolean};

function Album({albumId, isFavourite = false}: AlbumProps): JSX.Element {
  const navigate = useNavigate();
  const goToGallery = (id: number) => {
    navigate(`gallery/${id}`);
  };

  return (
    <div className="item" onClick={() => goToGallery(albumId)}>
      <Avatar
        shape="square"
        size="large"
        className={'avatar' + (isFavourite ? 'favourite' : '')}
        icon={<FolderTwoTone />}
      />
      {isFavourite ? 'Favourites' : `Album ${albumId}`}
    </div>
  );
}

const GalleriesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 20px; /* Gap between grid items */

  div.item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;

    .avatar {
      background-color: #7dbcea;

      &.favourite {
        background-color: #fdd13f;
      }
    }
  }

  div.item:hover {
    background-color: #cbedff;
  }
`;

function extractAlbums(photos: Photo[]) {
  return [...new Set(photos.map((photo) => photo.albumId))];
}
