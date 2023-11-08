"use client";

import { Gallery, GalleryRelationshipProps } from "@/payload-types";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Container,
  Modal,
  SimpleGrid,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { Image } from "@/_components/Image";
import React, { useMemo, useState } from "react";
import classes from "./GalleryRelationship.module.css";
import { useDebounceCallback, useDisclosure, useHotkeys } from "@mantine/hooks";
import { ContainedAspectRatio } from "@/_components/ContainedAspectRatio";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "10rem" : "-10rem",
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.2,
        },
        x: {
          duration: 0.24,
        },
      },
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.2,
      },
      x: {
        duration: 0.24,
      },
    },
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "10rem" : "-10rem",
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.2,
        },
        x: {
          duration: 0.24,
        },
      },
    };
  },
};

interface ImageToRenderProps {
  image: Gallery;
}

const ImageToRender = React.forwardRef<HTMLDivElement, ImageToRenderProps>(
  ({ image }, ref) => {
    return (
      <ContainedAspectRatio
        pos="relative"
        ratio={image?.width / image?.height}
        center
        ref={ref}
      >
        <Image
          key={image?.id}
          image={image}
          fill={true}
          style={{ objectFit: "cover" }}
          sizes={`${image?.width}`}
        />
      </ContainedAspectRatio>
    );
  }
);

export const GalleryRelationship: React.FC<GalleryRelationshipProps> = ({
  galleryImages,
}) => {
  const images = galleryImages as Gallery[];
  const [opened, { open, close }] = useDisclosure(false);
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const openLightbox = (id) => {
    const image = images.find((img) => img.id === id);
    setPage([images.indexOf(image), 0]);
    open();
  };

  const paginateNext = useDebounceCallback(() => {
    paginate(1);
  }, 100);

  const paginatePrev = useDebounceCallback(() => {
    paginate(-1);
  }, 100);

  useHotkeys([
    ["ArrowLeft", paginatePrev],
    ["ArrowRight", paginateNext],
  ]);

  return (
    <>
      <Box mb={72}>
        <Container>
          <SimpleGrid cols={{ base: 3, sm: 4 }} spacing={4}>
            {images?.map((image) => (
              <AspectRatio
                key={`image-${image?.id}`}
                ratio={1 / 1}
                className={classes.aspectRatio}
              >
                <UnstyledButton
                  className={classes.button}
                  onClick={() => openLightbox(image?.id)}
                >
                  <Image
                    className={classes.image}
                    image={image}
                    src={image?.sizes?.preview?.url}
                    fill={true}
                    sizes={`25rem`}
                  />
                </UnstyledButton>
              </AspectRatio>
            ))}
          </SimpleGrid>
          <Modal.Root
            opened={opened}
            onClose={close}
            padding={0}
            size="auto"
            shadow="xl"
          >
            <Modal.Overlay blur={1} backgroundOpacity={0.72} />
            <Modal.Content style={{ background: "none" }}>
              <Modal.Body pos="relative">
                <ActionIcon
                  top={rem(7)}
                  right={rem(7)}
                  color="dark.8"
                  className={classes.closeButton}
                  onClick={close}
                >
                  <Box component={IconX} className={classes.closeIcon} />
                </ActionIcon>
                <Box className={classes.controlWrapper} left={rem(7)}>
                  <ActionIcon
                    onClick={() => paginate(-1)}
                    className={classes.control}
                    size="xl"
                    color="dark.8"
                  >
                    <IconArrowLeft />
                  </ActionIcon>
                </Box>
                <Box className={classes.controlWrapper} right={rem(7)}>
                  <ActionIcon
                    onClick={() => paginate(1)}
                    className={classes.control}
                    size="xl"
                    color="dark.8"
                  >
                    <IconArrowRight />
                  </ActionIcon>
                </Box>
                <Box
                  pos="relative"
                  w="100vw"
                  h="100vh"
                  mah="var(--_content-max-height, calc(100dvh - var(--modal-y-offset) * 2))"
                  maw="100%"
                  bg=""
                  style={{
                    overflowY: "hidden",
                    overflowX: "hidden",
                  }}
                >
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={`${images[imageIndex]?.id}`}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        ease: [0.22, 1, 0.32, 1],
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }}
                      style={{
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                    >
                      <ImageToRender image={images[imageIndex]} />
                    </motion.div>
                  </AnimatePresence>
                  <Box
                    bg="dark.9"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0.95,
                      backdropFilter: "blur(1rem)",
                    }}
                  />
                </Box>
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        </Container>
      </Box>
    </>
  );
};
