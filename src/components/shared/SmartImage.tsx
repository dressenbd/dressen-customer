"use client";

import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};


export default function SmartImage({
  src,
  alt,
  fill,
  sizes,
  width,
  height,
  style,
  ...rest
}: Props) {
  const styleFix: React.CSSProperties = { ...(style || {}) };

  if (!fill) {
    if (width && !height) styleFix.height = "auto";
    if (height && !width) styleFix.width = "auto";
  }

  if (fill && !sizes) {

    sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      width={width}
      height={height}
      style={styleFix}
      {...rest}
    />
  );
}
