import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps ={
        country: 'in',
        pageSize: 8,
        category:'general'
    }
    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props){
        super(props);
        this.state= {
            articles: [],
            loading: false,
            page: 1
        }      
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da135fdfedf148a5ad7f71a0755ddcb0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData =  await data.json();
        this.setState({
            articles: parsedData.articles, 
            totalArticles: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da135fdfedf148a5ad7f71a0755ddcb0&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData =  await data.json();
        // this.setState({
        //     articles: parsedData.articles, 
        //     totalArticles: parsedData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }

    handlePreviousClick= async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da135fdfedf148a5ad7f71a0755ddcb0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData =  await data.json();
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page-1})
        this.updateNews();
    }
    handleNextClick=async ()=>{
        // if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da135fdfedf148a5ad7f71a0755ddcb0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData =  await data.json();
        //     this.setState({
        //         page: this.state.page+1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
        this.setState({page: this.state.page+1})
        this.updateNews();
    }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
            })}
        </div>
        <div className="contaier d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News