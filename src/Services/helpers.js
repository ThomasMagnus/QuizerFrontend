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
}