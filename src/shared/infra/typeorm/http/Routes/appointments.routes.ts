import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../Middlewares/ensureAuthenticated';

import AppointmentsRepository from '../../../../../modules/appointments/repositories/AppointmentsRepository';
import CreateAppointementService from '../../../../../modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointementService();
  const appointment = await createAppointment.execute({date: parsedDate, provider_id})

  return response.json({
      appointment
  });
});

export default appointmentsRouter;