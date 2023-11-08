"use client";

import { forwardRef } from "react";
import { Media } from "@/payload-types";
import {
  Image as MantineImage,
  ImageProps as MantineImageProps,
  MantineRadius,
  BoxProps,
} from "@mantine/core";
import NextImage, { ImageProps as NextImageProps } from "next/image";

type OmitMultiple<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ImageProps
  extends OmitMultiple<NextImageProps, "style" | "src" | "alt">,
    BoxProps {
  image?: Media;
  radius?: MantineRadius;
  fit?: MantineImageProps["fit"];
  src?: string;
  alt?: string;
}

// export const Image: React.FC<ImageProps> = ({
//   image,
//   src,
//   alt,
//   placeholder,
//   blurDataURL,
//   draggable,
//   ...rest
// }) => {
//   return (
//     <MantineImage
//       component={NextImage}
//       src={src || image?.url || ""}
//       alt={alt || image?.alt || "Missing alt property"}
//       placeholder={placeholder || image?.blurDataURL ? "blur" : undefined}
//       blurDataURL={
//         blurDataURL || image?.blurDataURL ? image?.blurDataURL : undefined
//       }
//       draggable={draggable || false}
//       {...rest}
//     />
//   );
// }

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ image, src, alt, placeholder, blurDataURL, draggable, ...rest }, ref) => {
    return (
      <MantineImage
        component={NextImage}
        src={src || image?.url || ""}
        alt={alt || image?.alt || "Missing alt property"}
        placeholder={placeholder || image?.blurDataURL ? "blur" : undefined}
        blurDataURL={
          blurDataURL || image?.blurDataURL ? image?.blurDataURL : undefined
        }
        draggable={draggable || false}
        ref={ref}
        {...rest}
      />
    );
  }
);
