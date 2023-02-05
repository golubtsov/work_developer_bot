const Salary = require('./Salary');
class About_Job {
    create_note_job(job) {
        let note = ``;
        if (job.salary != 'Не указано') {
            let salary = new Salary();
            salary.check_from_to(
                job.salary.from,
                job.salary.to,
                job.salary.currency
            );
            this.about_job = `
${job.name}
Город: ${job.area_name}
Зарплата: ${salary.from_to}
            `;
        } else {
            this.about_job = `
${job.name}
Город: ${job.area_name}
Зарплата: ${job.salary}
            `;
        }

        return this.about_job;
    }
}

module.exports = About_Job;