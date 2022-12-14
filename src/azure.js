import { config } from "./configs.js";
import axios from "axios";
const azureClient = axios.create({
  baseURL: config.azureConfig.authUrl,
});
/**
 * @param {string} accessToken
 * @returns {Promise<{
 *  id: string
 *  displayName: string;
 *  givenName: string,
 *  mail: string,
 *  surname: string,
 *  id: string;
 * }>} ```
 * {
 *  businessPhones: [],
 *  displayName: 'Fernando Asulay',
 *  givenName: 'Fernando',
 *  jobTitle: null,
 *  mail: 'fasulay@inno-it.es',
 *  mobilePhone: null,
 *  officeLocation: null,
 *  preferredLanguage: null,
 *  surname: 'Asulay',
 *  userPrincipalName: 'fasulay@inno-it.es',
 *  id: '2cdebfc6-de46-4bb9-8322-5f2212176881'
 * }
 * ```
 */
export const validateToken = async (accessToken) => {
  try {
    const res = await azureClient.get("/me", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.debug("Valid access token for", res.data);
    return res.data;
  } catch (error) {
    console.debug(error);
    console.error("Failed to validate access token", {
      error: error?.response?.data?.error,
      code: error?.status,
      statusText: error?.statusText,
    });
    throw Error("Failed to validate access token");
  }
};
