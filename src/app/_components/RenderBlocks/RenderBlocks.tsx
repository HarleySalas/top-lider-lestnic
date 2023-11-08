"use client";
import React, { Fragment } from "react";
import { blockComponents } from "@/_blocks";

export const RenderBlocks: React.FC<any> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks
          ? blocks.map((block, index) => {
              const { id, blockType } = block;

              if (blockType && blockType in blockComponents) {
                const Block = blockComponents[blockType] as React.ComponentType;

                if (Block) {
                  return (
                    <Block key={`${blockType}-${id}-${index}`} {...block} />
                  );
                }
              }
            })
          : null}
      </Fragment>
    );
  }

  return null;
};
