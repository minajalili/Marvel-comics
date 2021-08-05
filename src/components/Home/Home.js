import md5 from 'md5'
import React, { Component } from 'react'
import axios from '../../API/AxiosUrls'
import { connect } from 'react-redux'
import * as actionsCreators from '../../store/Actions/index'
import { MDBContainer, MDBMedia, MDBCard } from 'mdbreact'
import { Modal, Button } from 'react-bootstrap'
import './Home.css'
import UserBar from '../UserBar/UserBar'


class Home extends Component {
    state={
        comicsRes:[],
        characterRes:[],
        apiInfo:'characters/',
        showerrorText:false,
        errorText:'',
        api_public_key:'',
        api_privet_key:''
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
        const api_public_key= process.env.REACT_APP_API_PUBLIC_KEY
        const api_privet_key= process.env.REACT_APP_API_PRIVET_KEY
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
        .catch(error=>{
            console.log(error)
            this.setState({ showerrorText: true, errorText: error.message })
        })

        
    }
    
    render() {
        
        
        return (
            <div>
                <UserBar/>
                {
                    this.state.characterRes.map(item=>{
                        return heroPanel(item.name, item.description, item.image)
                    })
                }
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', flexWrap:'wrap'}} >
                {
                this.state.comicsRes.map((item, i)=>{
                        return displayComics(item.image, item.link, i)
                })
                }
                </div>
                <Modal show={this.state.showerrorText} onHide={() => this.setState({ showerrorText: false })}>
                <Modal.Header closeButton className="modalheader">
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalbody"> {this.state.errorText}</Modal.Body>
                <Modal.Footer>
                    <Button  className="btnM" onClick={() => this.setState({ showerrorText: false })}>
                        close
                    </Button>
                </Modal.Footer>
                </Modal>
                
            </div>
        )
    }
}
const displayComics = (src,link, i)=>{
   return(   
        <MDBCard className="comics" key={i}>
            <a key={i+1000} target="_blank" href={link} rel="noreferrer">
                <img className="comics--img"  key={i+2000} src={src} alt="" />
            </a>
        </MDBCard>  
    )
}
const heroPanel =(name, detail, image)=>{
    return(
        <MDBContainer className="hero" key={name} >
            <MDBCard className="card-body hero__body">
                <MDBMedia className="hero__media">
                    <MDBMedia className="hero--img" object src={image} alt="" />
                    <MDBMedia className="hero__media__body" body>
                        <MDBMedia className="hero__media--heading" heading  >
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