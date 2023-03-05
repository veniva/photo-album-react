import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { FolderFilled, FolderTwoTone } from "@ant-design/icons";
import { Avatar, Badge, Space } from 'antd';
import styled from 'styled-components'
import { Photo } from "./gallerySlice";
import { useNavigate } from "react-router-dom";

type Props = {
  setPageTitle: (title: string) => void;
}
export default function Galleries({setPageTitle}: Props): JSX.Element {
  const photos = useAppSelector((state) => state.gallery.photos);
  const albumIds = useMemo(() => extractAlbums(photos), [photos]);
  const navigate = useNavigate();

  setPageTitle("List of Galeries");

  const goToGallery = (id: number) => {
    navigate(`gallery/${id}`)
  };

  return (
    <StyledSection>
      {albumIds.map((albumId, i) => (
          <div key={i} className="item" onClick={() => goToGallery(albumId)}>
            <Avatar shape="square" size="large" className="avatar" icon={<FolderTwoTone />} />
            Album {albumId}
          </div>
        ))}
      
    </StyledSection>
  );
}

const StyledSection = styled.section`
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
    }
  }

  div.item:hover {
    background-color: #cbedff;
  }
`;

function extractAlbums(photos: Photo[]) {
  return [...new Set(photos.map((photo) => photo.albumId))];
}
