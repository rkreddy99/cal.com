/**
 * This file contains tRPC's HTTP response handler
 */
import appRoutingForms from "@calcom/app-store/routing-forms/trpc-router";
import * as trpcNext from "@calcom/trpc/server/adapters/next";
import { createContext as createTrpcContext } from "@calcom/trpc/server/createContext";
import { createResponseMetaData } from "@calcom/trpc/server/createResponseMetaData";

export default trpcNext.createNextApiHandler({
  router: appRoutingForms,
  /**
   * @link https://trpc.io/docs/context
   */
  createContext: ({ req, res }) => {
    return createTrpcContext({ req, res });
  },
  /**
   * @link https://trpc.io/docs/error-handling
   */
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
  /**
   * Enable query batching
   */
  batching: {
    enabled: true,
  },
  /**
   * @link https://trpc.io/docs/caching#api-response-caching
   */
  responseMeta({ ctx, paths, type, errors }) {
    return createResponseMetaData({ ctx, paths, type, errors });
  },
});
