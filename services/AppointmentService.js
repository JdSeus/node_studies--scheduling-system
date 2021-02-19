var appointment = require("../models/Appointment");
var mongoose = require("mongoose");
var AppointmentFactory = require("../factories/AppointmentFactory");

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
                finished: false,
                notified: false,
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

    async GetAll(showFinished) {
        if(showFinished) {
            return await Appo.find();
        } else {
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment => {

                if (appointment.date != undefined) {
                    appointments.push( AppointmentFactory.Build(appointment) );
                }

            });

            return appointments;
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

    async GetById(id) {
        try {
            var event = await Appo.findOne({'_id' : id});
            return event;
        } catch {
            console.log(err);
        }
    }

    async Finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, {finished: true});
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async Search(query) {
        try {
            var appos = await Appo.find().or([{email: query},{cpf: query}]);
            return appos;
        } catch(err) {
            console.log(err);
            return [];
        }
    }

    async SendNotification() {
        var appos = await this.GetAll(false);
        console.log(appos);
    }

}

module.exports = new AppointmentService();