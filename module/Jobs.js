class Jobs{
    async get_jobs(param){
        await fetch(`https://api.hh.ru/vacancies/?text=${param}`)
            .then(data => data.json())
            .then(data => console.log(data.items[0]))
    }
}

let jobs = new Jobs();

module.exports = jobs.get_jobs;