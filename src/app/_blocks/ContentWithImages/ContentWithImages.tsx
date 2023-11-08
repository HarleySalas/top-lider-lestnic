"use client";

import { RichTextLexical } from "@/_components/RichTextLexical";
import { Media, ContentWithImagesProps } from "@/payload-types";
import { AspectRatio, Box, Grid } from "@mantine/core";
import { Image } from "@/_components/Image";
import React from "react";

export const ContentWithImages: React.FC<ContentWithImagesProps> = ({
  reversed,
  richText,
  images,
}) => {
  const ImagesToRender = () => {
    switch (images?.length) {
      case 1:
        return (
          <Box w="100%" pos="relative">
            <AspectRatio ratio={3 / 2} w="100%">
              <Image
                image={images[0]?.image as Media}
                fill={true}
                radius="md"
                sizes={`100vw, (min-width: 62em) 50vw, (min-width: 75em): 40rem`}
              />
            </AspectRatio>
          </Box>
        );
      case 2:
        return (
          <Box pos="relative" w="100%" pb="73%">
            <AspectRatio
              ratio={3 / 2}
              w="65%"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <Image
                image={images[0]?.image as Media}
                fill={true}
                radius="md"
                sizes={`60vw, (min-width: 62em): 25rem`}
              />
            </AspectRatio>
            <AspectRatio
              ratio={3 / 2}
              w="65%"
              style={{ position: "absolute", bottom: 0, right: 0 }}
            >
              <Image
                image={images[1]?.image as Media}
                fill={true}
                radius="md"
                sizes={`60vw, (min-width: 62em): 25rem`}
              />
            </AspectRatio>
          </Box>
        );
      case 3:
        return (
          <Grid gutter="sm">
            <Grid.Col span={12}>
              <AspectRatio ratio={3 / 2}>
                <Image
                  image={images[0]?.image as Media}
                  fill={true}
                  radius="md"
                  sizes={`100vw, (min-width: 62em): 38rem`}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <AspectRatio ratio={3 / 2}>
                <Image
                  image={images[1]?.image as Media}
                  fill={true}
                  radius="md"
                  sizes={`50vw, (min-width: 62em): 19rem`}
                />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <AspectRatio ratio={3 / 2}>
                <Image
                  image={images[2]?.image as Media}
                  fill={true}
                  radius="md"
                  sizes={`50vw, (min-width: 62em): 18rem`}
                />
              </AspectRatio>
            </Grid.Col>
          </Grid>
        );
      case 4:
        return (
          <Grid gutter="xs">
            {images?.map(({ image, id }: { image: Media; id: string }) => (
              <Grid.Col span={6} key={id}>
                <AspectRatio ratio={3 / 2}>
                  <Image
                    image={image}
                    fill={true}
                    radius="md"
                    sizes={`50vw, (min-width: 62em): 18rem`}
                  />
                </AspectRatio>
              </Grid.Col>
            ))}
          </Grid>
        );
    }
  };
  return (
    <Grid gutter={{ base: "xl", md: 72 }} align="center">
      <Grid.Col pos="relative" span={{ base: 12, md: 6 }}>
        {!reversed ? (
          <RichTextLexical content={richText} />
        ) : (
          <ImagesToRender />
        )}
      </Grid.Col>
      <Grid.Col pos="relative" span={{ base: 12, md: 6 }}>
        {!reversed ? (
          <ImagesToRender />
        ) : (
          <RichTextLexical content={richText} />
        )}
      </Grid.Col>
    </Grid>
  );
};
