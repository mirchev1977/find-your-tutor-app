export default {
  async contactTutor(context, payload) {
    const newInquiry = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://find-your-tutor-app-default-rtdb.europe-west1.firebasedatabase.app/inquiries/${payload.tutorId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newInquiry)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send inquiry.'
      );
      throw error;
    }

    newInquiry.id = responseData.name;
    newInquiry.tutorId = payload.tutorId;

    context.commit('addInquiry', newInquiry);
  },
  async fetchInquiries(context) {
    const tutorId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-your-tutor-app-default-rtdb.europe-west1.firebasedatabase.app/inquiries/${tutorId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch inquiries.'
      );
      throw error;
    }

    const inquiries = [];

    for (const key in responseData) {
      const inquiry = {
        id: key,
        tutorId: tutorId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      inquiries.push(inquiry);
    }

    context.commit('setInquiries', inquiries);
  }
};
