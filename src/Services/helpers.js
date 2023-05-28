export class TeacherHelper {

    constructor(context) {
        this.context = context
    }

    getGroup = (e) => {
        const target = e.target
        this.context.setState({group: target.value})
        console.log(this.context.state)
    }

    getSubjects = (e) => {
        const target = e.target
        this.context.setState({subject: target.value})
        console.log(this.context.state)
    }

    getTasks = (data) => {
        this.context.setState({tasks: data})
        let uniqueMassDates = new Set()
        let resultMass = []

        data.forEach(item => {
            uniqueMassDates.add(new Date(item.putdate).toLocaleDateString())
        })
        
        let tasksMassByDates = []
        uniqueMassDates.forEach(item => {
            let mass = data.filter(elem => new Date(elem.putdate).toLocaleDateString() === item)
            let tasksData = {}
            tasksData[item] = mass
            tasksMassByDates.push(tasksData)
        })
        this.context.setState({tasksByDates: tasksMassByDates})

        this.context.state.tasksByDates.forEach(item => {
            let key = Object.keys(item)[0]
            item[key].forEach(elem => {
                console.log(elem)
            })
        })

        this.context.setState({fileDates: uniqueMassDates})
        this.context.setState({tasks: resultMass})
    }
}