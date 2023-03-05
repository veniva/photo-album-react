import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Checkbox, Image, Tooltip } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styled from "styled-components";
import { setFavorites } from "../../app/appSlice";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type UrlParams = {
  id: string;
};

type Props = {
  setPageTitle: (title: string | JSX.Element) => void;
};

export default function Galleriy({ setPageTitle }: Props): JSX.Element {
  const { id } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const allImages = useAppSelector((state) => state.gallery.photos);
  const favouriteIds = useAppSelector((state) => state.parsisted.favorites);

  const galleryImages = useMemo(() => {
    if (id === undefined) return [];

    if (id === "0") {
      // show favourites
      return allImages.filter((image) => favouriteIds.includes(image.id));
    }

    const albumId = parseInt(id);
    return allImages.filter((image) => image.albumId === albumId);
  }, [allImages, id, favouriteIds]);

  const isImageFavourite = useCallback(
    (imageId: number) => favouriteIds.includes(imageId),
    [favouriteIds]
  );

  const updateFavorite = (imageId: number, e: CheckboxChangeEvent) => {
    const updatedFavIds = [...favouriteIds];
    const index = updatedFavIds.findIndex((favId) => favId === imageId);
    const checked = e.target.checked;

    if (checked) {
      if (index === -1) updatedFavIds.push(imageId);
    } else {
      if (index !== -1) updatedFavIds.splice(index, 1);
    }

    dispatch(setFavorites(updatedFavIds));
  };

  useEffect(() => {
    setPageTitle(
      <>
        <Link to="/">
          <ArrowLeftOutlined style={{ color: "white" }} />
        </Link>{" "}
        {id !== "0" ? `Gallery ${id}` : "Favourite images"}
      </>
    );
  }, []);

  return galleryImages.length ? (
    <GalleryContainer className="gallery">
      {galleryImages.map((image, i) => (
        <Tooltip key={i} title={image.title} placement="right">
          <Card
            title={image.title}
            bordered={false}
            hoverable
            extra={
              <div
                title={
                  (!isImageFavourite(image.id) ? "Add to" : "Remove from") +
                  " favourites"
                }
              >
                <Checkbox
                  checked={isImageFavourite(image.id)}
                  onChange={(e) => updateFavorite(image.id, e)}
                />
              </div>
            }
          >
            <Image
              src={image.thumbnailUrl}
              preview={{ src: image.url }}
              alt={image.title}
            />
          </Card>
        </Tooltip>
      ))}
    </GalleryContainer>
  ) : (
    <>No favourite images.</>
  );
}

const GalleryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: 20px; /* Gap between grid items */
`;
