import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const populatePathname: BeforeChangeHook = ({ data }) => {
  return {
    ...data,
    pathname: data?.breadcrumbs?.at(-1).url,
  };
};
