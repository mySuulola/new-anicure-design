import {ADD_VACCINE, DELETE_VACCINE} from '../constant';
import dayjs from 'dayjs';


const animalCalculations = {
  broiler: [
    {
      isMedication: true,
      nextVaccinationType: `Antibiotics + Multivitamins (Day 1-5)`,
      day: 1,
      interval: 0,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 7,
      interval: 6,
      nextVaccinationType: `Anticoccidial`,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      day: 9,
      interval: 3,
      nextVaccinationType: `ND + IBH`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 11,
      interval: 2,
      nextVaccinationType: `1st Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 18,
      interval: 7,
      nextVaccinationType: `ND + IBH`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 21,
      interval: 3,
      nextVaccinationType: `2nd Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 28,
      interval: 7,
      nextVaccinationType: `Fowl Pox`,
      routeOfAdministration: `Wing web`,
    },
  ],
  noiler: [
    {
      isMedication: true,
      nextVaccinationType: `Antibiotics + Multivitamins (Day 1-5)`,
      day: 1,
      interval: 0,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 7,
      interval: 6,
      nextVaccinationType: `Anticoccidial, clean water in the afternoon(Day 7-8)`,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 10,
      interval: 3,
      nextVaccinationType: `1st Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 12,
      interval: 2,
      nextVaccinationType: `ND + IBH`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 20,
      interval: 8,
      nextVaccinationType: `2nd Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 28,
      interval: 8,
      nextVaccinationType: `LaSota vaccine `,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      isMedication: true,
      day: 34,
      interval: 6,
      nextVaccinationType: `Anticoccidiosis (Day 34-36)`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      isMedication: true,
      day: 40,
      interval: 6,
      nextVaccinationType: `Deworm `,
      routeOfAdministration: ``,
    },
    {
      isMedication: true,
      day: 41,
      interval: 1,
      nextVaccinationType: `Multivitamins`,
      routeOfAdministration: ``,
    },
  ],
  turkey: [
    {
      isMedication: true,
      nextVaccinationType: `Antibiotics + Multivitamins (Day 1-5)`,
      day: 1,
      interval: 0,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 7,
      interval: 6,
      nextVaccinationType: `Anticoccidial, clean water in the afternoon(Day 7-8)`,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 10,
      interval: 3,
      nextVaccinationType: `1st Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 12,
      interval: 2,
      nextVaccinationType: `ND + IBH`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 20,
      interval: 8,
      nextVaccinationType: `2nd Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 28,
      interval: 8,
      nextVaccinationType: `LaSota vaccine `,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 30,
      interval: 2,
      nextVaccinationType: ` Fowl pox vaccine `,
      routeOfAdministration: `Wing Web`,
    },
    {
      isMedication: true,
      day: 34,
      interval: 4,
      nextVaccinationType: `Anticoccidiosis`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      isMedication: true,
      day: 40,
      interval: 6,
      nextVaccinationType: `Deworm`,
      routeOfAdministration: ``,
    },
    {
      isMedication: true,
      day: 41,
      interval: 1,
      nextVaccinationType: `Multivitamins`,
      routeOfAdministration: ``,
    },
  ],
  cockerel: [
    {
      isMedication: true,
      nextVaccinationType: `Antibiotics + Multivitamins (Day 1-5)`,
      day: 1,
      interval: 0,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 7,
      interval: 6,
      nextVaccinationType: `Anticoccidial, clean water in the afternoon(Day 7-8)`,
      routeOfAdministration: `Oral/ Drinking water`,
    },
    {
      isMedication: true,
      day: 10,
      interval: 3,
      nextVaccinationType: `1st Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 12,
      interval: 2,
      nextVaccinationType: `ND + IBH`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 20,
      interval: 8,
      nextVaccinationType: `2nd Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 28,
      interval: 8,
      nextVaccinationType: `LaSota vaccine `,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 30,
      interval: 2,
      nextVaccinationType: ` Fowl pox vaccine `,
      routeOfAdministration: `Wing Web`,
    },
    {
      isMedication: true,
      day: 34,
      interval: 4,
      nextVaccinationType: `Anticoccidiosis`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      isMedication: true,
      day: 40,
      interval: 6,
      nextVaccinationType: `Deworm`,
      routeOfAdministration: ``,
    },
    {
      isMedication: true,
      day: 41,
      interval: 1,
      nextVaccinationType: `Multivitamins`,
      routeOfAdministration: ``,
    },
  ],
  layer: [
    {
      nextVaccinationType: `Repeat Marek`,
      day: 7,
      interval: 5,
      routeOfAdministration: `Subcuit at the back of the neck`,
    },
    {
      day: 10,
      interval: 3,
      nextVaccinationType: `1st Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 12,
      interval: 2,
      nextVaccinationType: `ND + IBH`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 20,
      interval: 8,
      nextVaccinationType: `2nd Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 22,
      interval: 2,
      nextVaccinationType: `Primer E.coli`,
      routeOfAdministration: `Intramuscular`,
    },
    {
      day: 28,
      interval: 6,
      nextVaccinationType: `Gumboro`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 30,
      interval: 2,
      nextVaccinationType: ` Fowl pox vaccine `,
      routeOfAdministration: `Wing Web`,
    },
    {
      day: 44,
      interval: 14,
      nextVaccinationType: `Infectious Coryza (primer dose)`,
      routeOfAdministration: `Subcuit at back of the neck`,
    },
    {
      day: 47,
      interval: 3,
      nextVaccinationType: `Lasota vaccine `,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 50,
      interval: 3,
      nextVaccinationType: `Booster E.coli`,
      routeOfAdministration: `Oral (via drinking water)`,
    },
    {
      day: 56,
      interval: 6,
      nextVaccinationType: `Salmonella  (primer dose)`,
      routeOfAdministration: `Intramuscular`,
    },
    {
      day: 69,
      interval: 13,
      nextVaccinationType: `Infectious Coryza (booster dose)`,
      routeOfAdministration: `Subcuit at back of the neck`,
    },
    {
      day: 76,
      interval: 7,
      nextVaccinationType: `ND Oil`,
      routeOfAdministration: ``,
    },
    {
      day: 84,
      interval: 8,
      nextVaccinationType: `Salmonella  (booster dose)`,
      routeOfAdministration: `Intramuscular`,
    },
    {
      day: 110,
      interval: 26,
      nextVaccinationType: `ND+IB+EDS`,
      routeOfAdministration: `Intramuscular`,
    },
  ],
};

export const addVaccine = (newBird, email) => async (dispatch) => {
  // try {
  //   console.log(animalCalculations[newBird.birdType]);
  //   const filteredVaccineSchedule = await animalCalculations[
  //     newBird.birdType
  //   ].filter((vacc) => {
  //     console.log(vacc);
  //     return +newBird.ageOfBirds <= +vacc.day;
  //   });

  //   console.log(filteredVaccineSchedule);
  //   let dayCount;

  //   for (let i = 0; i < filteredVaccineSchedule.length; i++) {
  //     let calculatedTime = '';
  //     if (i === 0) {
  //       dayCount = 1 //0 + filteredVaccineSchedule[i].interval;
  //     } else {
  //       dayCount += filteredVaccineSchedule[i].interval;
  //     }
  //     calculatedTime = dayjs()
  //       .add(dayCount, 'day') //day
  //       .format();
  //       console.log('------------------')
  //       console.log(calculatedTime)
  //       console.log('------------------')

  //     filteredVaccineSchedule[i].nextVaccinationDate = calculatedTime;

  //     if (newBird.isVaccinationReminderAlarm) {
  //       const fireDate = ReactNativeAN.parseDate(new Date(calculatedTime));
  //       const alarmNotificationData = {
  //         title: newBird.planName,
  //         fire_date: fireDate,
  //         message: `Vaccination Notification for Day ${filteredVaccineSchedule[i].day}`,
  //         channel: 'my_channel_id',
  //         bypass_dnd: true,
  //         small_icon: 'ic_launcher',
  //         has_button: true,
  //         data: {vaccine: filteredVaccineSchedule[i].nextVaccinationType},
  //       };

  //       await ReactNativeAN.scheduleAlarm(alarmNotificationData);
  //       LocalNotification({
  //         message: filteredVaccineSchedule[i].nextVaccinationType,
  //         date: filteredVaccineSchedule[i].nextVaccinationDate,
  //       });
  //     }
  //   }

  //   const newVaccinePlan = {
  //     planName: newBird.planName,
  //     initialAgeOfBird: newBird.ageOfBirds,
  //     vaccinationReminder: {
  //       alarm: newBird.isVaccinationReminderAlarm,
  //       sms: newBird.isVaccinationReminderSMS,
  //     },
  //     animalType: newBird.birdType,
  //     flockSize: newBird.flockSize,
  //     schedule: filteredVaccineSchedule,
  //   };
  //   try {
  //     console.log(newVaccinePlan, '************');
  //     console.log(email, '************2');
  //     firestoreRef
  //       .doc(email)
  //       .update({
  //         vacc: firestore.FieldValue.arrayUnion(newVaccinePlan),
  //       });
  //   } catch (error) { 
  //     firestoreRef
  //       .doc(email)
  //       .set({
  //         vacc: firestore.FieldValue.arrayUnion(newVaccinePlan),
  //       });
  //     console.log(error, 'here is the error');
  //   }

  //   return dispatch({
  //     type: ADD_VACCINE,
  //     payload: newVaccinePlan,
  //   });
  // } catch (error) {
  //   console.log('erorr ', error);
  // }
};

export const deleteVaccine = (id) => (dispatch) => {
  return dispatch({
    type: DELETE_VACCINE,
    payload: {id: id},
  });
};
