import kycTypes from './types';

export const kycActions = {
  setTemplate: (template) => ({
    type: kycTypes.SET_TEMPLATE,
    payload: { template },
  }),
  updateRelyingParty(payload, error) {
		if (error) {
			payload = { ...payload, error: error.message };
			error = true;
    }

		return { type: kycTypes.KYC_RP_UPDATE, payload, error };
	},
	// addKYCApplication(rpName, application) {
	// 	return {
	// 		type: kycTypes.KYC_RP_APPLICATION_ADD,
	// 		payload: { name: rpName, application }
	// 	};
	// },
	// deleteKYCApplication(rpName, applicationId) {
	// 	return {
	// 		type: kycTypes.KYC_RP_APPLICATION_DELETE,
	// 		payload: { name: rpName, applicationId }
	// 	};
	// },
	// setCancelRoute(route) {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATION_CANCEL_ROUTE_SET,
	// 		payload: route
	// 	};
	// },
	// setCurrentApplication(
	// 	relyingPartyName,
	// 	templateId,
	// 	returnRoute,
	// 	cancelRoute,
	// 	title,
	// 	description,
	// 	agreement,
	// 	vendor,
	// 	privacyPolicy,
	// 	termsOfService,
	// 	attributes = [],
	// 	error
	// ) {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATION_CURRENT_SET,
	// 		payload: {
	// 			relyingPartyName,
	// 			templateId,
	// 			returnRoute,
	// 			cancelRoute,
	// 			title,
	// 			description,
	// 			agreement,
	// 			vendor,
	// 			privacyPolicy,
	// 			termsOfService,
	// 			attributes,
	// 			error
	// 		}
	// 	};
	// },
	// clearCurrentApplication() {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATION_CURRENT_SET
	// 	};
	// },
	// setApplicationsAction(applications) {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATIONS_SET,
	// 		payload: applications
	// 	};
	// },
	// setProcessingAction(processing) {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATIONS_PROCESSING,
	// 		payload: processing
	// 	};
	// },
	// setMessages(message) {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATION_MESSAGE_SET,
	// 		payload: message
	// 	};
	// },
	// clearMessages() {
	// 	return {
	// 		type: kycTypes.KYC_APPLICATION_MESSAGE_CLEAR
	// 	};
	// }
};

export default kycActions;
