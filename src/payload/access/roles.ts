import type { User } from "../payload-types";

import type { AccessArgs, AccessResult } from "payload/config";

export const roles = (
  access: AccessArgs,
  roles: User["roles"]
): AccessResult => {
  const user: User = access.req?.user;

  if (user) {
    return roles.some((role) => {
      return user?.roles?.some((individualRole) => {
        return individualRole === role;
      });
    });
  }

  return false;
};
