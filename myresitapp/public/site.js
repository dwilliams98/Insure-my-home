var register_username = ''
var register_password = ''
var register_confirm_password = ''
var login_username = ''
var login_password = ''
var is_admin = false;

function getLoginUsername(value) {
    login_username = value
}

function getLoginPassword(value) {
    login_password = value
}

function getIsAdmin(value) {
    if (value == "on") {
        sessionStorage.setItem('isAdmin', true);
        is_admin = true;
    } else {
        sessionStorage.setItem('isAdmin', false);
        is_admin = false;
    }
}

function getRegisterUsername(value) {
    register_username = value
}

function getRegisterPassword(value) {
    register_password = value
}

function getRegisterConfirmPassword(value) {
    register_confirm_password = value
}

async function register(event) {
    event.preventDefault()
    if (register_password != register_confirm_password) {
        alert('Password must be confirmed!')
        return
    }
    let payload = {
        username: register_username,
        password: register_password
    }
    let resp = await sendRequest('/register', 'post', payload)

    if (resp.status == 201) {
        window.location.href = '/login'
    } else if (resp.status == 409) {
        alert(resp.data.error)
    } else {
        alert(resp.statusText)
    }
}

async function login(event) {
    event.preventDefault()
    let payload = {
        username: login_username,
        password: login_password,
        is_admin: is_admin
    }
    console.log(is_admin)
    let resp = await sendRequest('/login', 'post', payload)
    sessionStorage.setItem('is_admin', false)
    if (resp.status == 200) {
        sessionStorage.setItem('token', resp.data.token)
        sessionStorage.setItem('is_admin', resp.data.is_admin)
        window.location.href = '/customers'
    } else if (resp.status == 401) {
        alert(resp.data.error)
    } else {
        alert(resp.statusText)
    }
}

function sendRequest(url, method, payload) {
    return axios
        .request({
            method: method,
            url: `${url}`,
            data: payload,
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        })
        .then(res => res)
        .catch(error => error.response)
}

async function displayCustomerList() {
    let resp = await sendRequest('/customers/list', 'get', '')
    let list = resp.data
    document.getElementById('customer_list').innerHTML = ''
    let data = ``
    for (let i = 0; i < list.length; i++) {
        let customer = {
            customer_id: "'" + list[i]._id + "'",
            name: list[i].name,
            address: list[i].address,
            property_id: list[i].property_id,
            property_price: list[i].property_price
        }
        if (sessionStorage.getItem("is_admin") == true) {
            data +=
                `<tr>` +
                `<td>` +
                `${customer.name}` +
                `</td>` +
                `<td>` +
                `${customer.address}` +
                `</td>` +
                `<td>` +
                `${customer.property_id}` +
                `</td>` +
                `<td>` +
                `${customer.property_price}` +
                `</td>` +
                `<td>` +
                `<button onclick="report(${customer.customer_id})">Report</button>` +
                `<button onclick="deleteCustomer(${customer.customer_id})">Delete</button>` +
                `</td>` +
                `</tr>`
        } else {
            data +=
                `<tr>` +
                `<td>` +
                `${customer.name}` +
                `</td>` +
                `<td>` +
                `${customer.address}` +
                `</td>` +
                `<td>` +
                `${customer.property_id}` +
                `</td>` +
                `<td>` +
                `${customer.property_price}` +
                `</td>` +
                `<td>` +
                `<button onclick="report(${customer.customer_id})">Report</button>` +
                `</td>` +
                `</tr>`
        }

    }

    document.getElementById('customer_list').innerHTML = data;
}

var report_year = '';
var report_damage_amount = '';
var report_damage_type = '';
var report_customer_id = '';

async function report(id) {
    modal.style.display = "block";
    report_customer_id = id;
    let resp = await sendRequest(`report/${id}`, 'get', '');
    if (resp.data != null) {
        let claim = resp.data;
        report_year = claim.year;
        report_damage_amount = claim.damage_amount;
        report_damage_type = claim.damage_type;
    }
    document.getElementById('report_year').value = report_year;
    document.getElementById('report_damage_amount').value = report_damage_amount;
    document.getElementById('report_damage_type').value = report_damage_type;
}

async function reportNow(event) {
    event.preventDefault();
    let payload = {
        year: report_year,
        damage_amount: report_damage_amount,
        damage_type: report_damage_type,
        customer_id: report_customer_id
    }

    let resp = await sendRequest('/report', 'post', payload);
    if (resp.status != 200 && resp.status != 201) {
        alert(resp.statusText)
    }
    modal.style.display = "none";
}

function getReportYear(value) {
    report_year = value;
}

function getReportDamageAmount(value) {
    report_damage_amount = value;
}

function getReportDamageType(value) {
    report_damage_type = value;
}

async function deleteCustomer(id) {
    let resp = await sendRequest(`/customer/${id}`, 'delete', '');

    if (resp.status == 204) {
        await displayCustomerList();
    } else if (resp.status == 404) {
        alert(resp.data.error)
    } else {
        alert(resp.statusText)
    }
}

var customer_name = ''
var customer_address = ''
var customer_property_id = ''
var customer_property_price = ''

async function addCustomer(event) {
    event.preventDefault()
    let payload = {
        name: customer_name,
        address: customer_address,
        property_id: Number(customer_property_id),
        property_price: Number(customer_property_price)
    }
    let resp = await sendRequest('/add/customer', 'post', payload)

    if (resp.status == 201) {
        window.location.href = "/customers"
    } else if (resp.status == 409) {
        alert(resp.data.error)
    } else {
        alert(resp.statusText)
    }

}

function getCustomerNmae(value) {
    customer_name = value
}

function getCustomerAddress(value) {
    customer_address = value
}

function getCustomerPropertyId(value) {
    customer_property_id = value
}

function getCustomerPropertyPrice(value) {
    customer_property_price = value
}