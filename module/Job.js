// класс, на основе которого формируется вакансия
class Job {
    constructor(
        id,
        name,
        salary,
        address,
        experience,
        key_skills
    ) {
        this.id = id,
        this.name = name,
        this.salary = salary,
        this.address = address,
        this.experience = experience,
        this.key_skills = key_skills
    }

    // проверяем св-во salary, чтобы оно не было равно null
    check_salary() {
        if (this.salary == null) {
            this.salary = 'Не указано';
        } else {
            this.check_from_to();
        }
    }

    // если salary != null, то проверяем св-ва from to внутри него равны они null или нет
    check_from_to() {
        if (this.salary.from == null && this.salary.to != null) {
            this.salary = `до ${this.salary.to} ${this.salary.currency}`;
        } else if(this.salary.from != null && this.salary.to == null){
            this.salary = `от ${this.salary.from} ${this.salary.currency}`;
        } else if(this.salary.from != null && this.salary.to != null){
            this.salary = `от ${this.salary.from} до ${this.salary.to} ${this.salary.currency}`;
        }
    }

    // проверяем св-во address, чтобы оно не было равно null
    check_adress(){
        if(this.address == null || this.address == undefined){
            this.address = 'Не уаказано';
        } else {
            this.address = this.address.raw;
        }
    }

    // создает из св-ва key_skills строку
    check_skills(){
        let skills = '';
        for (const el of this.key_skills) {
            skills += `
${el.name},`;
        }
        this.key_skills = skills;
    }

    // создаем запись о вакансии и возвращаем ее
    create_note(){
        return `
${this.name}
Город: ${this.address}
Зарплата: ${this.salary}
Опыт работы: ${this.experience}
Ключевые навыки: ${this.key_skills}
        `;
    }
}

module.exports = Job;