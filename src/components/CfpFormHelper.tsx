import { ConferenceAttendeeMembers } from "../enum/conferenceAttendeeMembers";
import { ConferenceCommitteeMembers } from "../enum/conferenceCommitteeMembers";
import { ConferenceTypes } from "../enum/conferenceTypes";
import { getCacheValue, IBaseCache } from "../utils/cacheUtils";
import {
  CFpFormCacheNamespaces,
  CfpFormCacheUtils,
  cfpFormKey,
} from "../utils/cfpFormCacheUtil";

export interface ICFPFormState {
  conferenceType: ConferenceTypes;
  conferenceCommitteeMembers: ConferenceCommitteeMembers;
  conferenceAttendeeMembers: ConferenceAttendeeMembers;
  problem: string;
  problemReason: string;
  title: string;
  titleProblemSolution: string;
  takeways: string;
}

export const initialCfpFormState: ICFPFormState = {
  conferenceType: ConferenceTypes.Free,
  conferenceCommitteeMembers: ConferenceCommitteeMembers.EXPERT_DOMAIN,
  conferenceAttendeeMembers: ConferenceAttendeeMembers.DIVERSE_INSIGHTS,
  problem: "",
  problemReason: "",
  title: "",
  titleProblemSolution: "",
  takeways: "",
};

export async function setCfpFormCache(value: ICFPFormState) {
  try {
    await CfpFormCacheUtils.set(
      CFpFormCacheNamespaces.CFP_FORM.name,
      cfpFormKey,
      {
        value,
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export async function getCfpFormCache(): Promise<ICFPFormState> {
  try {
    const cacheValue = await CfpFormCacheUtils.get<IBaseCache<ICFPFormState>>(
      CFpFormCacheNamespaces.CFP_FORM.name,
      cfpFormKey
    );
    return getCacheValue(cacheValue);
  } catch (e) {
    console.error(e);
  }
}
