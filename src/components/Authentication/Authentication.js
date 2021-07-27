import axios from '../../API/AxiosLogin'

const Authnetication = (email, password)=>{
    const user = []

    axios.get()
        .then(response => {
            //console.log(response.data)
            if (response.data) {
                 response.data.map(item=>{
                    if(item.email===email && item.password==password){
                        console.log('true',item.user,item.heroId)
                        localStorage.setItem('user', JSON.stringify(item))
                        return  user.push({
                            "name": item.name,
                            "user": item.user,
                            "email": item.email,
                            "password":item.password,
                            "heroId": item.heroId

                        })
                    }
                })
                
            }
            
        })
        .catch(error => {
            console.log(error);
            
        });
        
        return ([ user  ])
}
export default Authnetication