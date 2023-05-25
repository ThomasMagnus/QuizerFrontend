export const getPage = async (url, tokenName) => {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(tokenName)}`
        }
    })
        .then(response => response.json())
}

export const detectLocalStorage = async (tokenName, detectAuthUrl) => {
    if (localStorage.getItem(tokenName)) {
        await fetch(detectAuthUrl, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(tokenName)}`
            }
        }).then(response => {
                if (response.statusCode === 200) {
                    this.setState({auth: true})
                }
            })
    }
};


export function onChangeProperties(e) {
    const target = e.target
    this.setState({
        form: {
            ...this.state.form,
            fname: target.name === 'firstname' ? target.value.toLowerCase() : this.state.form.fname,
            lname: target.name === 'lastname' ? target.value.toLowerCase() : this.state.form.lname,
            login: target.name === 'login' ? target.value.toLowerCase() : this.state.form.login,
            password: target.name === 'password' ? target.value.toLowerCase() : this.state.form.password,
        }
    })
}

export async function postDataValue(url, body = null, method) {
    const res = await fetch(url, {
        method: method,
        body,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5207',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (HTML, like Gecko) ' +
                'Chrome/102.0.5005.167 YaBrowser/22.7.5.1027 browser/2.5 Safari/537.36',
        }
    })

    if (res.status !== 200) throw new Error("Ошибка отпраки данных на сервер")
    return await res.json()
}

export async function  getData(url) {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:5276',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (HTML, like Gecko) ' +
                'Chrome/102.0.5005.167 YaBrowser/22.7.5.1027 browser/2.5 Safari/537.36',
        }
    })

    if (res.status !== 200) throw new Error("Ошибка отпраки данных на сервер")
    return await res.json()
}

export const validateForm = (formProperties) => {
    for (let item of Object.values(formProperties)) {
            if (item.trim() === '') {
                return false
            }
        }
    return true
}

