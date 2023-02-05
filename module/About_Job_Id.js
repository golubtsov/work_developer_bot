class About_Job_Id {
    constructor(job) {
        this.job = job
    }

    check_skills() {
        let list_skills = '';
        for (const el of this.job.key_skills) {
            list_skills += `
- ${el.name}`;
        }
        this.job.key_skills = list_skills;
    }

    create_note(){
        let info_note = `
${this.job.name}
Город: ${this.job.area_name}
Адресс: ${this.job.address.street} ${this.job.address.building}
Зараплата: ${this.job.salary}
Опыт работы: ${this.job.experience}
Ключевые навыки: ${this.job.key_skills}
        `;
        return info_note;
    }

}

module.exports = About_Job_Id;