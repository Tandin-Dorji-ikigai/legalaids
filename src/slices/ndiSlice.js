import { NDI_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ndiApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch Access Token
        getAccessToken: builder.query({
            query: () => ({
                url: `${NDI_URL}/token`,
                method: "GET",
            }),
        }),

        // Create a Proof Request
        createProofRequest: builder.query({
            query: () => ({
                url: `${NDI_URL}/proof-request`,
                method: "GET",
            }),
        }),

        // Get Proof by Thread ID
        getProofByThreadId: builder.query({
            query: () => ({
                url: `${NDI_URL}/get-proof-threadID`,
                method: "GET",
            }),
        }),

        // Create Proof Request Using Relationship
        createProofRequestUsingRelationship: builder.query({
            query: () => ({
                url: `${NDI_URL}/proof-request-relationship`,
                method: "GET",
            }),
        }),

        // Unsubscribe from Webhook
        unsubscribeWebhook: builder.mutation({
            query: () => ({
                url: `${NDI_URL}/unsubscribe-webhook`,
                method: "POST",
            }),
        }),

        // Subscribe to Webhook
        subscribeWebhook: builder.mutation({
            query: () => ({
                url: `${NDI_URL}/subscribe-webhook`,
                method: "POST",
            }),
        }),

        // Register Webhook
        registerWebhook: builder.mutation({
            query: () => ({
                url: `${NDI_URL}/register-webhook`,
                method: "POST",
            }),
        }),

        checklogin: builder.mutation({
            query: () => ({
                url: `${NDI_URL}/ndilogin`,
                method: "GET",
            }),
        })
    }),
});

// Export hooks for usage in components
export const {
    useGetAccessTokenQuery,
    useCreateProofRequestQuery,
    useGetProofByThreadIdQuery,
    useCreateProofRequestUsingRelationshipQuery,
    useUnsubscribeWebhookMutation,
    useSubscribeWebhookMutation,
    useRegisterWebhookMutation,
    useCheckloginMutation,
} = ndiApiSlice;
