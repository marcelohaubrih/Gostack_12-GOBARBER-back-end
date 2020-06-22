import { Router, response } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../Models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

    if(findAppointmentInSameDate){
        return response.status(400).json({
            message: "This appointment is already booked"
        })
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json({
        appointment
    });
});

export default appointmentsRouter;