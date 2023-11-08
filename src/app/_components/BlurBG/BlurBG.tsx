import { Box } from "@mantine/core";
import React from "react";
import classes from "./blurBG.module.css";
import YellowGradient from "../../../../public/yellow-gradient.svg";

export const BlurBG = ({ color }) => {
  return (
    <>
      <Box className={classes.root}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter
              id="blurBg"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFIx"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                stdDeviation="56"
                result="effect1_backgroundBlur"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <Box
          className={`${classes.background}
      ${
        {
          brandPrimary: classes.rootBrandPrimary,
          dark: classes.rootDark,
          gray: classes.rootGray,
        }[color] || undefined
      }
      `}
        >
          <Box
            className={`${classes.ellipse} ${classes.ellipseOne} ${classes[color]}`}
          />
          <Box
            className={`${classes.ellipse} ${classes.ellipseTwo} ${classes[color]}`}
          />
          <Box
            className={`${classes.ellipse} ${classes.ellipseThree} ${classes[color]}`}
          />
          <Box
            className={`${classes.ellipse} ${classes.ellipseFour} ${classes[color]}`}
          />
        </Box>
      </Box>
    </>
  );
};
