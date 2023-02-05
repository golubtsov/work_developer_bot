class Job {
    constructor(
        id,
        name,
        area_name,
        salary
    ) {
        this.id = id,
        this.name = name,
        this.area_name = area_name,
        this.salary = salary
    }

    check_salary(){
        if(this.salary == null){
            this.salary = 'Не указано'
        }
    }
}

module.exports = Job;