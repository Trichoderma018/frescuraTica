async function GetData(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function GetDataById(endpoint, id) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error obteniendo el producto con id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo el producto:', error);
        throw error;
    }
}

async function PostData(data,endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error posting data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}
async function UpdateData(data,endpoint, id) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error updating user with id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function DeleteData(endpoint,id) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

async function PatchData(data,endpoint, id) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error updating user with id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
export default { GetData, PostData, UpdateData, DeleteData, GetDataById,PatchData };