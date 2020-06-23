import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointementService from '../Services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointementService();
    const appointment = await createAppointment.execute({date: parsedDate, provider})

    return response.json({
        appointment
    });
  } catch (error) {
    return response.status(400).json({
      message: error.message
    });
  };
});

export default appointmentsRouter;