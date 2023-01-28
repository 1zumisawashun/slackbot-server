import { projectFunctions } from "../libs/firebase";
import { httpsCallable } from "firebase/functions";
import { ONCALL_ONCALLDEFAULT } from "../constants/cloud-functions/helpers";
import {
  STRIPE_CHECKOUT_SESSIONS_CREATE,
  STRIPE_PRODUCTS_CREATE,
  STRIPE_PAYMENTINTENT_CREATE,
  FIRESTORE_VOTES_CREATE,
  FIRESTORE_VOTES_UPDATE,
} from "../constants/cloud-functions/services";

export const useFunctions = () => {
  // stripe
  const stripePaymentIntentCreate = httpsCallable(
    projectFunctions,
    STRIPE_PAYMENTINTENT_CREATE
  );
  const stripeCheckoutSessionsCreate = httpsCallable(
    projectFunctions,
    STRIPE_CHECKOUT_SESSIONS_CREATE
  );
  const stripeProductsCreate = httpsCallable(
    projectFunctions,
    STRIPE_PRODUCTS_CREATE
  );

  // firestore
  const firestoreVotesUpdate = httpsCallable(
    projectFunctions,
    FIRESTORE_VOTES_UPDATE
  );
  const firestoreVotesCreate = httpsCallable(
    projectFunctions,
    FIRESTORE_VOTES_CREATE
  );

  // other
  const onCallDefault = httpsCallable(projectFunctions, ONCALL_ONCALLDEFAULT);

  return {
    stripePaymentIntentCreate,
    stripeCheckoutSessionsCreate,
    stripeProductsCreate,
    firestoreVotesUpdate,
    firestoreVotesCreate,
    onCallDefault,
  };
};
