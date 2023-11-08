import PageTemplate from './[...slug]/page'

export default PageTemplate

// import { Section } from "@/components/Section";
// import { CreditCTA } from "@/modules/CreditCTA";
// import { DataPoints } from "@/modules/DataPoints";
// import { GalleryPreview } from "@/modules/GalleryPreview";
// import { GetCatalogCTA } from "@/modules/GetCatalogCTA";
// import { PrimaryHero } from "@/modules/PrimaryHero";
// import { Questions } from "@/modules/Questions";
// import { TypeTabs } from "@/modules/TypeTabs";
// import { getSeoMetadata } from "@/utilities/getSeoMetadata";
// import { notFound } from "next/navigation";

// export const generateMetadata = async () => {
//   return {
//     ...(await getSeoMetadata({ url: "/api/globals/homepage" })),
//     alternates: {
//       canonical: "/",
//     },
//   };
// };

// const getData = async () => {
//   if (process.env.BUILD_MODE !== "build") {
//     const res = await fetch(
//       `${process.env.PRIVATE_CMS_URL}/api/globals/homepage`
//     );

//     if (!res.ok) {
//       return undefined;
//     }

//     return res.json();
//   } else {
//     return undefined;
//   }
// };

// export default async function Home() {
//   const data = await getData();

//   if (!data) {
//     notFound();
//   }

//   return (
//     <>
//       <PrimaryHero data={data?.hero} />
//       <DataPoints
//         // mt="xl"
//         title={data?.attributes?.title}
//         description={data?.attributes?.description}
//         cta={data?.attributes?.link}
//         items={data?.attributes?.items}
//       />
//       <Section
//         title={data?.finishing?.title}
//         description={data?.finishing?.description}
//       >
//         <TypeTabs
//           data={data?.finishing?.items}
//           cta={data?.finishing?.ctaModal}
//         />
//       </Section>
//       <GetCatalogCTA data={data?.getCatalog} />
//       <Section
//         title={data?.estimate?.title}
//         subtitle={data?.estimate?.subtitle}
//         description={data?.estimate?.description}
//         graySection={true}
//       >
//         <Questions data={data?.estimate?.form} />
//       </Section>
//       <CreditCTA data={data.credit} />
//       <Section
//         title={data?.gallery?.title}
//         description={data?.gallery?.description}
//       >
//         <GalleryPreview data={data?.gallery} />
//       </Section>
//     </>
//   );
// }
