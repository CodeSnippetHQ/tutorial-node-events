async function handleGetFile(e) {
    e.preventDefault();
    const response = await fetch('/api/file');
    const { data } = await response.json();
    alert(data);
}

async function handleGetCurrentUser(e) {
    e.preventDefault();
    const response = await fetch('/api/current-user');
    const { data } = await response.json();
    alert(JSON.stringify(data));
}

async function handleGetCustomers(e) {
    e.preventDefault();
    const response = await fetch('/api/customers');
    const { data } = await response.json();
    alert(JSON.stringify(data));
}

document.getElementById('file').addEventListener('click', handleGetFile);
document.getElementById('current-user').addEventListener('click', handleGetCurrentUser);
document.getElementById('customers').addEventListener('click', handleGetCustomers);
