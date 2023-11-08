"use client";
import { Gallery, GalleryPreviewBlock } from "@/payload-types";
import "@mantine/carousel/styles.css";
import React, { useCallback, useEffect, useState } from "react";
import { Carousel, Embla } from "@mantine/carousel";
import { Image } from "@/_components/Image";
import { AspectRatio, Box, Center, Progress } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { CallToAction } from "@/_components/CallToAction";
import classes from "./GalleryPreview.module.css";

export const GalleryPreview: React.FC<GalleryPreviewBlock> = ({
  images,
  callToAction,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
    }
  }, [embla]);
  return (
    <Box mt={42}>
      <Box w="100%" display="flex">
        <Carousel
          w="100%"
          slideSize={{ base: "100%", xs: "50%", sm: "33.333333%", lg: "25%" }}
          style={{ flex: 1 }}
          slideGap={4}
          align="start"
          loop={true}
          getEmblaApi={setEmbla}
          nextControlIcon={<IconChevronRight className={classes.icon} />}
          previousControlIcon={<IconChevronLeft className={classes.icon} />}
          classNames={{ control: classes.control, controls: classes.controls }}
        >
          {images
            ? images?.map(({ image }: { image: Gallery }) => (
                <Carousel.Slide key={image?.id} pos="relative">
                  <AspectRatio>
                    <Image
                      image={image}
                      src={image?.sizes?.preview?.url}
                      fill={true}
                      sizes={`50rem`}
                      radius="xs"
                    />
                  </AspectRatio>
                </Carousel.Slide>
              ))
            : null}
        </Carousel>
      </Box>
      <Progress
        value={scrollProgress}
        color="brandPrimary"
        mx="auto"
        size="sm"
        mt={4}
      />
      <Center>
        <CallToAction {...(callToAction as any)} mt="xl" />
      </Center>
    </Box>
  );
};
