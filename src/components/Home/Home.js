import md5 from 'md5'
import React, { Component } from 'react'
import axios from '../../API/AxiosUrls'


export default class Home extends Component {
    state={
        responseData:[]
    }
    componentDidMount(){
        this.fetchComics()
        
        
    }

    fetchComics(){
        const api_public_key='1466077d22b028b09b51c4dcfef6a14e'
        const api_privet_key='c5f99f06235c337aaf84ee5e6a3f20166389ee96'
        const baseAPi='http://gateway.marvel.com/v1/public/characters/'
        const heroId = '1011299'
        const ts =  Number(new Date());
        const hash = md5(ts+api_privet_key+api_public_key);
        const url = `${baseAPi}${heroId}/comics?orderBy=-modified&limit=5&ts=${ts}&apikey=${api_public_key}&hash=${hash}`
        let tested =[]
        axios.get(url)
        .then(responseData=>{
            console.log(responseData.data.data.results)
            responseData.data.data.results.map((res)=>{
                return tested.push(res)
            })
            console.log(tested, typeof tested)
            this.setState({
                responseData: tested
            })
            
        })
        .catch(error=>console.log(error))
    }
    
    render() {
        
        
        return (
            <div>
                Home
                {
                    this.state.responseData.map(item=>{
                        console.log(item.images[0].path)
                        return(
                            <img style={{width:'10rem', height:'auto'}} src={`${item.images[0].path}/clean.jpg`} alt="" />
                        )
                    })
                }
                {/* <img src={`${[0].images[0].path}/clean.jpg`} alt="" /> */}
            </div>
        )
    }
}
