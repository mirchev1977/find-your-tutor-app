export default {
  async registerTutor(context, data) {
    const userId = context.rootGetters.userId;
    const tutorData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
      pic: data.pic,
      isBeingEdited: data.isBeingEdited
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://find-your-tutor-app-default-rtdb.europe-west1.firebasedatabase.app/tutors/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(tutorData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    if (tutorData && tutorData.isBeingEdited){
      context.commit('updateTutor', {
        ...tutorData,
        id: userId
      });
    } else {
      context.commit('registerTutor', {
        ...tutorData,
        id: userId
      });
    }
  },
  async loadTutors(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://find-your-tutor-app-default-rtdb.europe-west1.firebasedatabase.app/tutors.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const tutors = [];

    for (const key in responseData) {
      const tutor = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
        pic: responseData[key].pic,
      };
      tutors.push(tutor);
    }

    context.commit('setTutors', tutors);
    context.commit('setFetchTimestamp');
  }
};
