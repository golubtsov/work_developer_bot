// получая обЪекты вакансий с hh.ru, некоторые объекты содержат св-во salary = null или внутри salary св-ва from to могут = null
// класс Salary сделан для того, чтобы не выводить эти самые значения, которые равны null

class Salary {

    // from - св-во salary (зарплата от), currency - св-во salary (валюта)
    // ф-ия проверяет равно from null или нет
    check_from(from, currency) {
        if (from == null) {
            this.from = 'Не указано'
        } else {
            this.from = `${from} ${currency}`
        }
    }

    // to - св-во salary (зарплата до), currency - св-во salary (валюта)
    // ф-ия проверяет равно to null или нет
    check_to(to, currency) {
        if (to == null) {
            this.to = 'Не указано'
        } else {
            this.to = `${to} ${currency}`
        }
    }
}

module.exports = Salary;