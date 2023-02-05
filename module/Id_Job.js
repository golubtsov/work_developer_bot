const Job = require('./Job');

class Id_Job extends Job{
    constructor(id, name, area_name, salary, experience, key_skills, address) {
        super(id, name, area_name, salary);
        this.address = experience,
        this.experience = key_skills,
        this.key_skills = address
    }
}

module.exports = Id_Job;