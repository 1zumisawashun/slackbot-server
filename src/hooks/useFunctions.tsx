import { projectFunctions } from "../libs/firebase";
import { httpsCallable } from "firebase/functions";
import { ONCALLTEMPLATE } from "../constants/cloud-functions/common";
import {
  STRIPE_CHECKOUT_SESSIONS_CREATE,
  STRIPE_PRODUCTS_CREATE,
  STRIPE_PAYMENTINTENT_CREATE,
  FIRESTORE_VOTES_CREATE,
  FIRESTORE_VOTES_UPDATE,
  FIRESTORE_VOTES_DELETE,
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
  const firestoreVotesDelete = httpsCallable(
    projectFunctions,
    FIRESTORE_VOTES_DELETE
  );

  // other
  const onCallTemplate = httpsCallable(projectFunctions, ONCALLTEMPLATE);

  return {
    stripePaymentIntentCreate,
    stripeCheckoutSessionsCreate,
    stripeProductsCreate,
    firestoreVotesUpdate,
    firestoreVotesCreate,
    firestoreVotesDelete,
    onCallTemplate,
  };
};
