import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';




@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{




  newAppointmnetTitle : string="";
  newAppointmentDate : Date = new Date();
  appointments:Appointment[] = []


  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [] 
  }


  addAppointment(){
    if(this.newAppointmnetTitle.trim().length && this.newAppointmentDate){
      let newAppoint: Appointment ={        
          id:Date.now(),
          title: this.newAppointmnetTitle,
          date: this.newAppointmentDate
      }
      this.appointments.push(newAppoint)
      this.newAppointmnetTitle="";
      this.newAppointmentDate=new Date();

      localStorage.setItem("appointments",JSON.stringify(this.appointments));
    }

    //alert(this.appointments.length);

    //alert(this.newAppointmnetTitle+"  "+ this.newAppointmentDate)
  }

  deleteAppointment(index: number){
    this.appointments.splice(index,1);
    localStorage.setItem("appointments",JSON.stringify(this.appointments));
  }

}
