var appointment = require("../models/Appointment");
var mongoose = require("mongoose");

const Appo = mongoose.model("Appointment", appointment);

class AppointmentService {

    async Create(name, email, description, cpf, date, time) {

        var params = [
            name, email, description, cpf, date, time
        ]

        if (this.CheckParamsVoid(params) == false) {
            var newAppo = new Appo({
                name,
                email,
                description,
                cpf,
                date,
                time,
                finished: false
            });
            try{
                await newAppo.save();
                return true;
            }catch(err){
                console.log(err);
                return false;
            }
        } else {
            return false;
        }
    }

    CheckParamsVoid(params) {
        var voids = 0;
        params.forEach(element => {
            if (element == '' || element == ' ') {
                voids++;
            }
        });

        if (voids > 0) {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = new AppointmentService();