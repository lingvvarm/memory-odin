async function getImg(limit: number): Promise<object> {
    const response = await fetch(`https://api.nekosapi.com/v3/images/random?rating=safe&limit=${limit}`, { method: "GET" });
    const result = await response.json()
    return result;
}


export default getImg;