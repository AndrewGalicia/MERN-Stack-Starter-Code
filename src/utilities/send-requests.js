import { getToken } from './users-service'

export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an option s object as the 2nd arguement
    // used to includ e adata payload, set headers, specifcy the method, etc
    const options = { method };
    if (payload) {
           options.headers = {'Content-Type': 'application/json' };
           options.body = JSON.stringify(payload); 
        }
    const token = getToken();
    if (token) {
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }  

    const res = await fetch(url, options);
    // if res.ok is false then something went wrong
    if (res.ok) return res.json();
    throw new Error('Bad Request');
    }
