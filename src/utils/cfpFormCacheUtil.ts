import localForageCfpForm from "localforage";
import { CacheUtilsService } from "./cacheUtils";

export const CFP_FORM_CACHE_STORAGE_NAME = "cfp-form-if-youtube";

export const CFpFormCacheNamespaces = {
  CFP_FORM: {
    name: "cfpForm" as CFpFormCacheNamespace,
  },
};

export type CFpFormCacheNamespace = "cfpForm";
export const cfpFormKey = "cfpFormKeyYoutube";

export const CfpFormCacheUtils = new CacheUtilsService<CFpFormCacheNamespace>(
  localForageCfpForm,
  {
    name: CFP_FORM_CACHE_STORAGE_NAME,
  }
);
