import useHttps from "./useHttps";

const {http} = useHttps()
const sendData = ()=>{
    const sendHtml = async(type, html)=>{
        try{
            await http.post('/page', {
                type: type,
                id_user: 1,
                content: html
            })
        }catch(err){
            console.log(err);
        }
    }
    return {sendHtml}
}

export default sendData;