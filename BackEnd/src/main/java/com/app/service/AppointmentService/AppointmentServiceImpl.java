package com.app.service.AppointmentService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.app.service.IEmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.dao.IAddressDao;
import com.app.dao.IAppointmentDao;
import com.app.dao.IBloodInventoryDao;
import com.app.dao.IPatientDao;
import com.app.dao.IUserDao;
import com.app.dto.AppointmentDTO;
import com.app.dto.SaveAppointmentDTO;
import com.app.dto.UpdateAppointmentDTO;
import com.app.entities.Appointment;
import com.app.entities.Patient;
import com.app.entities.Status;
import com.app.entities.User;
import com.app.service.BloodInventoryService.IBloodInventoryService;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AppointmentServiceImpl implements IAppointmentService {

	@Autowired
	private IAppointmentDao appointmentDao;

	@Autowired
	private IUserDao userDao;
	
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IBloodInventoryDao bloodInventoryDao;
	
	@Autowired
	private IBloodInventoryService bloodInventoryService;

	@Autowired
	private IAddressDao addressDao;

	@Autowired
	private IPatientDao patientDao;

    @Autowired
    private IEmailService emailService;
	
	
	// method  to return all the appointment(can be used to check history of appointment)
	@Override
	public List<AppointmentDTO> getAllAppointment() {

		return appointmentDao.findAllAppointment()
				.stream()
				.map(i->mapper.map(i, AppointmentDTO.class))
				.collect(Collectors.toList());
	}

	
	
	// methood to return list of all pending  appointment
	@Override
	public List<AppointmentDTO> pendingAppointments() {

		List<AppointmentDTO> appointmentDTOs= appointmentDao.findByStatus(Status.PENDING)
				.stream()
				.map(i -> mapper.map(i, AppointmentDTO.class))
				.collect(Collectors.toList());
//		List<AppointmentDTO> appointmentDTOs=appointmentDao.findByStatus(Status.PENDING);
		
		 return appointmentDTOs;
	}

//	@Override
//	public Appointment saveAppointment(Appointment appointment) {
//		return appointmentDao.save(appointment);
//	}

	@Override
	public boolean updateAppointmentsStatus( UpdateAppointmentDTO appointment) {
		
		String status=appointment.getStatus().toString();
		int updatedsts = 0;
		log.info("status-> " + status + "  appointment-> " + appointment.toString());
		Appointment appointmentById= appointmentDao.findById(appointment.getId()).orElseThrow(()->new ResourceNotFoundException("user does not have user id"+appointment.getId()));
		
		User user=appointmentById.getUser();
		String header = "YOUR APPOINTMENT  REQUEST  " + status;
		log.info("----header -->" + header);
		String messageBody ="";
		if (addressDao.findUserAddress(user.getId()) != null) {
			updatedsts = appointmentDao.updateAppointmentStatus(Status.valueOf(status), appointment.getId());
			log.info("----updatedsts--->  " +updatedsts );
			
			if (status.equalsIgnoreCase("APPROVED")) {
				
				if (updatedsts != 1 || bloodInventoryService.findByBloodGroupAndBagSize(appointmentById.getBloodGroup(),
						appointmentById.getBagSize())<appointmentById.getBagQuantity()) {
					return false;
				}
				log.info("---reducing blood count---> " );
				bloodInventoryDao.subBloodCount(appointmentById.getBagQuantity(), LocalDate.now(), appointmentById.getBagSize(),
						appointmentById.getBloodGroup());
				
				
				
				  log.info("---inside mail sending condition checking ---> " );

                  header = "YOUR APPOINTMENT REQUEST " + status;

                messageBody =
                        "<h2 style='color:#d9534f;'>Blood Bank Appointment Update</h2>" +

                                "<p>Hello <b style='color:blue'>" + user.getFirstName() + "</b>,</p>" +

                                "<p>Your blood request appointment status has been <b style='color:green'>" + status + "</b>.</p>" +

                                "<h3>Appointment Details</h3>" +

                                "<table border='1' cellpadding='8' cellspacing='0' width='100%' style='border-collapse: collapse; text-align:center;'>"

                                + "<tr style='background-color:#f2f2f2;'>"
                                + "<th>Field</th>"
                                + "<th>Details</th>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Requesting Person</td>"
                                + "<td>" + user.getFirstName() + "</td>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Patient Name</td>"
                                + "<td>" + appointmentById.getPatient().getName() + "</td>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Blood Group</td>"
                                + "<td>" + appointmentById.getBloodGroup() + "</td>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Bag Size</td>"
                                + "<td>" + appointmentById.getBagSize() + " ml</td>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Bag Quantity</td>"
                                + "<td>" + appointmentById.getBagQuantity() + "</td>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Appointment Date</td>"
                                + "<td>" + appointmentById.getAppointmentScheduleDate() + "</td>"
                                + "</tr>"

                                + "<tr>"
                                + "<td>Status</td>"
                                + "<td style='color:green;'><b>" + status + "</b></td>"
                                + "</tr>"

                                + "</table>"

                                + "<br><p>Thank you for using our Blood Bank System.</p>";

                emailService.sendMail(user.getEmail(), header, messageBody);
				 
				 
			} else {
				
				
				  log.info("----sending mail ---in rejected condition-> " ); messageBody =
				  messageBody +
				  " <font/> due to some reason .<p> <ul> unavaliability of blood</ul> " +
				  "<ul> you may have not registered your address(please register your address)</ul> </p>"
				  ; emailService.sendMail(user.getEmail(), header, messageBody);
				 }

		}

		return true;
	}

//	@Override
//	public Appointment appointmentById(Long id) {
//
//		return appointmentDao.findById(id).orElseThrow(() -> new RuntimeException("appointment not found"));
//	}
//
	
	// take appointment by user id
	// take patient id from appointment
	//
	
	
	// getting all the appointments created by a user 
	@Override
	public List<Appointment> getAppointmentByuserId(Long id) {
		log.info("in service method to get all appointment created by user ");
		List<Appointment> list = appointmentDao.findByUserId(id);
				/*.stream().map(i->mapper.map(i, AppointmentDTO.class))
		           .collect(Collectors.toList());*/
		return list;
	}
	
	// creating a  new appointment
	@Override
	public Appointment saveAppointment(Long userid, SaveAppointmentDTO appointment) {
		Appointment appointment2;
		Patient patient = patientDao.findByName(appointment.getName());
		Appointment appointment3 = mapper.map(appointment, Appointment.class);
		User user = userDao.findById(userid).orElseThrow(()->new ResourceNotFoundException("user does not have user id"+userid));
		appointment3.setUser(user); 
		appointment3.setAppointmentCreationDate(LocalDate.now());
		appointment3.setAppointmentScheduleDate(appointment.getAppointmentScheduleDate());
		appointment3.setCenter(appointment.getCenter());
		appointment3.setBagSize(appointment.getBagSize());
		appointment3.setBagQuantity(appointment.getBagQuantity());
		appointment3.setStatus(Status.PENDING);
		appointment3.setBloodGroup(appointment.getBloodGroup());
		
		if(patient!=null) {
			appointment3.setPatient(patient);
//			appointment3.setUser(user); 
//			appointment3.setAppointmentCreationDate(LocalDate.now());
//			appointment3.setAppointmentScheduleDate(appointment.getAppointmentScheduleDate());
//			appointment3.setCenter(appointment.getCenter());
//			appointment3.setBagSize(appointment.getBagSize());
//			appointment3.setBagQuantity(appointment.getBagQuantity());
//			appointment3.setStatus(Status.PENDING);
//			appointment3.setBloodGroup(appointment.getBloodGroup());
			 
			appointment2 = appointmentDao.save(appointment3);
			
		}
		else {
			Patient save = patientDao.save(mapper.map(appointment, Patient.class));
			appointment3.setPatient(save);
//			appointment3.setUser(user); 
			 appointment2 = appointmentDao.save(appointment3);
		
		}
		return appointment2;
	}

	

}
