// получая обЪекты вакансий с hh.ru, некоторые объекты содержат св-во salary = null или внутри salary св-ва from to могут = null
// класс Salary сделан для того, чтобы не выводить эти самые значения, которые равны null

class Salary {

    check_from_to(from, to, currency) {
        if (from == null && to != null) {
            this.from_to = `до ${to} ${currency}`;
        } else if(from != null && to == null){
            this.from_to = `от ${from} ${currency}`;
        } else if(from != null && to != null){
            this.from_to = `от ${to} ${currency} до ${to} ${currency}`;
        }
    }
}

module.exports = Salary;