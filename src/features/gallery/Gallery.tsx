import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Image, Tooltip } from "antd";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import styled from "styled-components";

type UrlParams = {
  id: string;
};

type Props = {
  setPageTitle: (title: string | JSX.Element) => void;
};

export default function Galleriy({ setPageTitle }: Props): JSX.Element {
  const { id } = useParams<UrlParams>();
  const allImages = useAppSelector((state) => state.gallery.photos);

  const galleryImages = useMemo(() => {
    if (!id) return [];

    const albumId = parseInt(id);
    return allImages.filter((image) => image.albumId === albumId);
  }, [allImages]);

  useEffect(() => {
    setPageTitle(
      <>
        <Link to="/">
          <ArrowLeftOutlined style={{ color: "white" }} />
        </Link>{" "}
        Gallery {id}
      </>
    );
  }, []);

  return (
    <GalleryContainer className="gallery">
      {galleryImages.map((image) => (
        <Tooltip title={image.title} placement="right">
          <Card title={image.title} bordered={false} hoverable>
            <Image
              src={image.thumbnailUrl}
              preview={{ src: image.url }}
              alt={image.title}
            />
          </Card>
        </Tooltip>
      ))}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 20px; /* Gap between grid items */
`;
