import type { Document, PayloadRequest } from "payload/types";

interface RevalidateProps {
  type?: "path" | "tag";
  value: string;
  global?: boolean;
  req: PayloadRequest;
  doc: Document;
}

export const revalidate = async ({
  type = "path",
  value,
  global = false,
  req,
  doc,
}: RevalidateProps) => {
  const handleRevalidate = async () => {
    try {
      const res = await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?secret=${
          process.env.NEXT_PRIVATE_REVALIDATION_KEY
        }&${type}=${value}${global ? "&global=true" : ""}`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        req.payload.logger.info(`Successfully revalidated ${type}: "${value}"`);
      } else {
        req.payload.logger.error(`Error revalidating ${type}: "${value}"`);
      }
    } catch (error) {
      req.payload.logger.error(
        `Error hitting revalidate route for ${type}: "${value}"`
      );
      console.error(error);
    }
  };

  handleRevalidate();

  return doc;
};
