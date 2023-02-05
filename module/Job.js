class Job {
    constructor(
        id,
        name,
        area_name,
        salary,
        address
    ) {
        this.id = id,
        this.name = name,
        this.area_name = area_name,
        this.salary = salary,
        this.address = address
    }

    check_salary(){
        if(this.salary == null){
            this.salary = 'Не указано'
        }
    }
}

module.exports = Job;