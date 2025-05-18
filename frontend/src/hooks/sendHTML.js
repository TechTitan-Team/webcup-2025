import useHttps from "./useHttps";

const {http} = useHttps()
const sendData = ()=>{
    const sendHtml = async(type, html)=>{
        try{
            let response = await http.post('/page', {
                type: type,
                id_user: 1,
                content: html
            })
            console.log(response.data)
            return response.data.url
        }catch(err){
            console.log(err);
        }
    }
    return {sendHtml}
}

export default sendData;