import md5 from 'md5'
import React, { Component } from 'react'
import axios from '../../API/AxiosUrls'


export default class Home extends Component {
    state={
        comicsRes:[],
        characterRes:[],
        apiInfo:'characters/'
    }
    componentDidMount(){
        this.fetchComics(this.state.apiInfo)
        
        
    }

    fetchComics(url){
        //api authnetication

        const api_public_key='1466077d22b028b09b51c4dcfef6a14e'
        const api_privet_key='c5f99f06235c337aaf84ee5e6a3f20166389ee96'
        const ts =  Number(new Date());
        const hash = md5(ts+api_privet_key+api_public_key);

        // api details
        const heroId = '1011299'
        const heroUrl = url+`${heroId}?ts=${ts}&apikey=${api_public_key}&hash=${hash}`
        //url+=`${heroId}?ts=${ts}&apikey=${api_public_key}&hash=${hash}`
        
        let Character = []
        let comics =[]
        
        //fetch character details

        axios.get(heroUrl)
        .then(Response=>{
            console.log(Response.data.data.results)
            Response.data.data.results.map((res)=>{
                        return Character.push({
                            'name':res.name,
                            'description':res.description,
                            'image':res.thumbnail.path+'/clean.jpg'
                        })
                    })
                    console.log(Character, typeof Character)
        })

        //fetch character's comics
        
        //url = `${heroId}/comics?orderBy=-modified&limit=5&ts=${ts}&apikey=${api_public_key}&hash=${hash}`
        const comicUrl = url + 
        `${heroId}/comics?orderBy=-modified&limit=5&ts=${ts}&apikey=${api_public_key}&hash=${hash}`

        axios.get(comicUrl)
        .then(Response=>{
            console.log(Response.data.data.results)
            Response.data.data.results.map((res)=>{
                return comics.push({
                    'image':res.images[0].path+'/clean.jpg',
                    'link':res.urls[0].url
                })
            })
            console.log(comics, typeof comics)

            this.setState({
                comicsRes: comics,
                characterRes: Character,
            })
            
        })
        .catch(error=>console.log(error))

        
    }
    
    render() {
        
        
        return (
            <div>
                
                    {/* {testHero(this.state.characterRes.name, this.state.characterRes.detail, this.state.characterRes.image)} */
                        this.state.characterRes.map(item=>{
                            return testHero(item.name, item.description, item.image)
                        })
                    }
                    {this.state.comicsRes.map(item=>{
                       return testcomics(item.image, item.link)
                    })}
                
                
            </div>
        )
    }
}
const testcomics = (src,link)=>{
   return(
        <a style={{margin:'1rem'}} href={link} target="_blank">
            <img style={{width:'100px', height:'100px'}} src={src} alt="" />
        </a>
    )
}
const testHero =(name, detail, image)=>{
    return(<div>
        <h1>{name}</h1>
        <p>{detail}</p>
        <img style={{width:'200px', height:'200px'}} src={image} alt="" />
    </div>)
}