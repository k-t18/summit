import { ServerDataTypes } from '../../../interfaces/meta-data-interface';
import getPageMetaData from '../../../utils/fetch-page-meta-deta';
import { CONSTANTS } from '../../../services/config/app-config';
import PageMetaData from '../../../components/PageMetaData';
import ProductListingMaster from '../../../components/ProductCategoriesComponents/ProductListingMaster';
import getSiteMapList from '../../../services/api/seo-apis/sitemap-api';
import getComponentsList from '../../../services/api/home-page-apis/get-components-list';
import getMultiLingualTextFromAPI from '../../../services/api/general-apis/multilanguage-api';
import { useEffect } from 'react';
import { catalogPageVisit, handleSiteInSleepMode, handleSiteOccupied } from '../../../lib/sockets/socket-functions';

export const getStaticPaths = async () => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const apiParams = { type: 'catalog' };
  let getPathsList: string[] = [];
  let getListOfAllPathsFromAPI: any = await getSiteMapList(apiParams, SUMMIT_APP_CONFIG);
  if (
    getListOfAllPathsFromAPI?.status === 200 &&
    getListOfAllPathsFromAPI?.data?.message?.msg === 'success' &&
    getListOfAllPathsFromAPI?.data?.message?.data?.length > 0
  ) {
    getPathsList = getListOfAllPathsFromAPI?.data?.message?.data?.map((path: string) => {
      const segments = path.split('/');
      const lastSegment = segments[segments.length - 1].replace(/^\//, ''); // Remove leading '/';
      return `${lastSegment}`;
    });
  }
  return {
    paths: getPathsList.map((category: string) => ({
      params: { category }, // Matches the [category] dynamic segment
    })),
    fallback: false, // Adjust based on your fallback strategy
  };
};

export const getStaticProps = async (context: any) => {
  const { category } = context.params;
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let componentsList: any;
  let fetchComponentsList: any = await getComponentsList('Product Category Page', SUMMIT_APP_CONFIG);
  if (fetchComponentsList?.status === 200 && fetchComponentsList?.data?.message?.msg === 'success') {
    componentsList = fetchComponentsList?.data?.message?.data;
  }
  let translationsList: any;
  let getMultilanguageData: any = await getMultiLingualTextFromAPI(SUMMIT_APP_CONFIG);
  if (getMultilanguageData?.length > 0) {
    translationsList = getMultilanguageData;
  } else {
    translationsList = [];
  }

  return {
    props: {
      catalogProductListPageComponents: fetchComponentsList?.data?.message?.data || {},
      translationsList,
    },
  };
};

const Index = ({ catalogProductListPageComponents, serverDataForPages }: any) => {
  useEffect(() => {
    const extractCatalogNameFromURL = location.pathname.split('/')[2];
    const userContactDetails = new URL(window.location.href);
    const qValue: string | null = userContactDetails.searchParams.get('q'); // Extracts "Anurag-9090897867"
    const [name, phone]: any = qValue?.split('-');

    const userObj = {
      name: name,
      phone: phone,
    };
    catalogPageVisit(extractCatalogNameFromURL, userObj);
  }, []);

  useEffect(() => {
    const userContactDetails = new URL(window.location.href);
    const qValue: string | null = userContactDetails.searchParams.get('q'); // Extracts "Anurag-9090897867"
    const [name, phone]: any = qValue?.split('-');

    // Listen for visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleSiteInSleepMode(name);
      } else if (document.visibilityState === 'visible') {
        handleSiteOccupied(name); // Emit site-occupied when the tab becomes active
      }
    };

    // Emit site-occupied when the page is first loaded
    handleSiteOccupied(name);

    window.addEventListener('beforeunload', () => handleSiteInSleepMode(name));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('beforeunload', () => handleSiteInSleepMode(name));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [document.visibilityState]);
  return (
    <>
      {/* {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />} */}
      <ProductListingMaster componentsList={catalogProductListPageComponents} />
    </>
  );
};

// export async function getServerSideProps(context: any) {
//   const { SUMMIT_APP_CONFIG } = CONSTANTS;
//   const method = 'get_meta_tags';
//   const version = SUMMIT_APP_CONFIG.version;
//   const entity = 'seo';
//   const params = `?version=${version}&method=${method}&entity=${entity}`;
//   const url = `${context.resolvedUrl.split('?')[0]}`;
//   if (CONSTANTS.ENABLE_META_TAGS) {
//     return await getPageMetaData(params, url);
//   } else {
//     return {
//       props: {},
//     };
//   }
// }
export default Index;
