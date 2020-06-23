import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointementService from '../Services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  try {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
  } catch (error) {
    return response.status(500).json({
      message: "Fatal Error!"
    });
  }
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointementService(appointmentsRepository);
    const appointment = createAppointment.execute({date: parsedDate, provider})

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