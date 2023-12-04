import axios from "axios";


const api_url = 'http://localhost:5000/api';

// admin
export async function destroyDB() {
    const res = await axios.delete(`${api_url}/destroy`)
    if (res.status !== 200) {
        throw new Error('Ошибка при удалении данных!')
    }
    
    return res.data
}


export async function createPerson(person) {
    const res = await axios.post(`${api_url}/create/person/${person.uuid}`, person,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    )
    if (res.status !== 200) {
        throw new Error('Ошибка при добавление ордера!')
    }
    
    return res.data
}

export async function updateUsername(person) {
    const res = await axios.put(`${api_url}/update/person/${person.uuid}`, person,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    )
    if (res.status !== 200) {
        throw new Error('Ошибка при добавление ордера!')
    }
    
    return res.data
}

export async function getPerson(uuid) {
    const res = await axios.get(`${api_url}/person/${uuid}`)
    if (res.status !== 200) {
        throw new Error('Ошибка при добавление ордера!')
    }
    
    return res.data
}

export async function saveOrder(order) {
    const res = await axios.post(`${api_url}/user/${order.uuid}`, order, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    )
    if (res.status !== 200) {
        throw new Error('Ошибка при добавление ордера!')
    }
    
    return res.data
}

export async function getOrders(uuid) {
    const res = await axios.get(`${api_url}/user/orders/${uuid}`)
    if (res.status !== 200) {
        throw new Error('Ошибка при получении данных!')
    }
    
    return res.data
}

export async function getFeedOrders(uuid) {
    const res = await axios.get(`${api_url}/feeds/${uuid}`)
    if(res.status !== 200) {
        throw new Error('Ошибка feeds')
    }
    return res.data
}

export async function getOneOrder(id) {
    const res = await axios.get(`${api_url}/order/${id}`)
    if (res.status !== 200) {
        throw new Error('Ошибка при получении данных!')
    }
    
    return res.data
}
export async function deleteOrder(id) {
    const res = await axios.delete(`${api_url}/order/${id}`)
    if (res.status !== 200) {
        throw new Error('Ошибка при получении данных!')
    }
    
    return res.data
}