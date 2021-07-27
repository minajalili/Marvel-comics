import md5 from 'md5'
import React, { Component } from 'react'
import axios from '../../API/AxiosUrls'
import { connect } from 'react-redux'
import * as actionsCreators from '../store/Actions/index'
import { MDBContainer, MDBMedia, MDBCard } from 'mdbreact';

import UserBar from '../UserBar/UserBar'


class Home extends Component {
    state={
        comicsRes:[],
        characterRes:[],
        apiInfo:'characters/'
    }
    componentDidMount(){
        const userRes = JSON.parse( localStorage.getItem('user'))
        if(userRes !== '' && userRes !== null){
            this.props.history.replace('/');            
        }else{
            this.props.history.replace('/login')
        }
        this.fetchComics(this.state.apiInfo)
        
        
    }

    fetchComics(url){
        //api authnetication

        const api_public_key='1466077d22b028b09b51c4dcfef6a14e'
        const api_privet_key='c5f99f06235c337aaf84ee5e6a3f20166389ee96'
        const ts =  Number(new Date());
        const hash = md5(ts+api_privet_key+api_public_key);

        // api details
        const heroId = this.props.userData.heroId? this.props.userData.heroId:'1011299'
        const heroUrl = url+`${heroId}?ts=${ts}&apikey=${api_public_key}&hash=${hash}`
        
        let Character = []
        let comics =[]
        
        //fetch character detail
        axios.get(heroUrl)
        .then(Response=>{
            Response.data.data.results.map((res)=>{
                        return Character.push({
                            'name':res.name,
                            'description':res.description,
                            'image':res.thumbnail.path+'/clean.jpg'
                        })
                    })
        })

        //fetch character's comics
        const comicUrl = url + 
        `${heroId}/comics?orderBy=-modified&limit=5&ts=${ts}&apikey=${api_public_key}&hash=${hash}`

        axios.get(comicUrl)
        .then(Response=>{
            Response.data.data.results.map((res)=>{
                return comics.push({
                    'image':res.images[0].path+'/clean.jpg',
                    'link':res.urls[0].url
                })
            })
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
                this.state.comicsRes.map((item, i)=>{
                        return testcomics(item.image, item.link, i)
                })
                }
                </div>
                
                
            </div>
        )
    }
}
const testcomics = (src,link, i)=>{
   return(   
        <MDBCard key={i} style={{margin:'1rem', padding:'0.5rem'}}>
            <a key={i+1000} target="_blank" href={link} rel="noreferrer">
                <img key={i+2000} style={{width:'200px', height:'auto'}} src={src} alt="" />
            </a>
            
        </MDBCard>  
    )
}
const testHero =(name, detail, image)=>{
    return(
        <MDBContainer key={name} style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}} >
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
const mapStateToProps = state => {
    return {
        userData: state.auth.user
    };
}
const mapDispatchToProps = dispatch => {

    return {

        login: (user) => dispatch(
            actionsCreators.login(user)
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);