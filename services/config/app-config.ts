let ENV = "DEV";

export const CONSTANTS = {
  API_BASE_URL:
    ENV === "PROD" ? "" : "https://digital-shelf.8848digitalerp.com",
  API_MANDATE_PARAMS: "/api/method/summitapp.sdk.api",
  VERSION: "v1",
  ENABLE_APPLY_COUPON_CODE: true,
  ENABLE_STORE_CREDIT: true,
  ENABLE_REDIRECT_FEATURE: false,
  ENABLE_PRODUCT_ENQUIRY_FEATURE: false,
  USE_SINGLE_ENQUIRY: false,
  USE_MULTI_ENQUIRY: false,
  DISPLAY_PRODUCT_PRICE_ON_PRODUCT_LISTING_CARD: true,
  DISPLAY_ADD_CART_BUTTON_ON_PRODUCT_LISTING_CARD: false,
  DOES_PRODUCT_HAS_VARIANTS: false,
  DOMAIN_NAME: "https://summit-b2b-demo.8848digital.com",
  // "SHOW_MORE_ITEMS" IS A KEY WHOSE VALUE DECIDES WHETHER TO SHOW LOAD MORE BUTTON OR PAGINATION.
  // IT WILL CONTAIN TWO VALUES "paginate" or "load-more"
  ENABLE_MISSING_PARTS: true,
  ENABLE_PAGINATION: true,
  ENABLE_LOAD_MORE: false,
  SHOW_MORE_ITEMS: "paginate",
  SHOW_FUTURE_STOCK_AVAILABILITY_TO_GUEST: true,
  ADD_TO_CART_FOR_GUEST: true,
  ALLOW_PAYMENT_GATEWAY: false,
  SHOW_TRANSPORTERS_LIST_TO_DEALER: true,
  ALLOW_REQUEST_QUOTATION: true,
  // "PRODUCT_LISTING_VIEW" IS A KEY WHOSE VALUE DECIDES WHETHER TO SHOW CARD VIEW OF LIST VIEW ON PRODUCT LISTING PAGE.
  // IT WILL CONTAIN TWO VALUES "list-view" or "grid-view"
  ENABLE_TOGGLE_PRODUCT_LISTING_VIEW: true,
  PRODUCT_LISTING_VIEW: "grid-view",
  ENABLE_META_TAGS: true,
  ENABLE_SEARCH_TEXT: false,
  ENABLE_PAYMENT_INTEGRATION: false,
  DEFAULT_CURRENCY_VALUE: "rupee",
  DEFAULT_LANGUAGE: "en",
};
