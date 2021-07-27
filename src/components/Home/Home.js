import md5 from 'md5'
import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from '../../API/AxiosUrls'
import { MDBContainer, MDBMedia, MDBCard } from 'mdbreact';

import UserBar from '../UserBar/UserBar'


class Home extends Component {
    state={
        comicsRes:[],
        characterRes:[],
        apiInfo:'characters/'
    }
    componentDidMount(){
        //this.fetchComics(this.state.apiInfo)
        
        
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
                <UserBar/>
                {
                    this.state.characterRes.map(item=>{
                        return testHero(item.name, item.description, item.image)
                    })
                }
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', flexWrap:'wrap'}} >
                {
                this.state.comicsRes.map(item=>{
                    return testcomics(item.image, item.link)
                })
                }
                </div>
                
                
            </div>
        )
    }
}
const testcomics = (src,link)=>{
   return(   
        <MDBCard style={{margin:'1rem', padding:'0.5rem'}}>
            <a href={link}>
                <img style={{width:'200px', height:'auto'}} src={src} alt="" />
            </a>
            
        </MDBCard>  
    )
}
const testHero =(name, detail, image)=>{
    return(
        <MDBContainer style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}} >
            <MDBCard className="card-body" style={{ margin: "1rem 0" }}>
                <MDBMedia style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <MDBMedia style={{width:'200px', height:'200px'}} object src={image} alt="" />
                    <MDBMedia body style={{ textAlign: 'justify', padding: '0.5rem'}}>
                        <MDBMedia heading style={{ textAlign: 'center',fontSize: '2rem', fontWeight: 'bold'}} >
                            {name}
                        </MDBMedia>
                        {detail}
                    </MDBMedia>
                </MDBMedia>
            </MDBCard>
        </MDBContainer>
    )
}
export default withRouter(Home)