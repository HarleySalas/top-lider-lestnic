import { CollectionConfig } from "payload/types";
import { isAdminFieldLevel } from "../../access/isAdmin";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "photo",
      label: {
        en: "Photo",
        ru: "Фото",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: {
            en: "First Name",
            ru: "Имя",
          },
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          label: {
            en: "Last Name",
            ru: "Фамилия",
          },
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "roles",
      saveToJWT: true,
      type: "select",
      label: {
        en: "Roles",
        ru: "Роли",
      },
      hasMany: true,
      defaultValue: ["editor"],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: {
            en: "Admin",
            ru: "Админ",
          },
          value: "admin",
        },
        {
          label: {
            en: "Editor",
            ru: "Редактор",
          },
          value: "editor",
        },
      ],
    },
  ],
};

export default Users;
