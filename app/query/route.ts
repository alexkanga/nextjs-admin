import postgres from 'postgres';

const POSTGRES_URL = process.env.POSTGRES_URL;
if(!POSTGRES_URL) {
    throw new Error("Missing POSTGRES_URL in .env");
}

const sql = postgres(POSTGRES_URL,{ssl : 'require'})

async function listCustomers(){
const data = await sql `select name from customers where email = 'amy@burns.com' `
return data;
}



export async function GET(){
try{
    const data = await listCustomers();
    if(!data){
        return Response.json({error : "Client not found"}, {status : 404 })
    }
    return Response.json(data)
}catch(error){
return Response.json ({error: "Server error"}, {status : 500})
}
}


