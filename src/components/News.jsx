import React, { Component } from 'react'
import NewsItem from './News_Item'
import Spinner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsComponent extends Component {

    static defaultProps = {
        pageSize: 8,
        category: "general"

    }

    static PropTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }



    // 1st run
    constructor() {
        super();
        console.log("I am constractor from news component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }

    }

    //2nd run
    async componentDidMount() {
        this.updateNews();
        document.title = `${this.capitalizeFirstLetter(this.props.category)} News`


    }

    async updateNews(pageNo) {
        this.setState({ loading: true }); // Set loading to true before fetching data

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(10);

        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
        this.props.setProgress(100);





    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    handlePreviousClick = async () => {

        this.setState({ page: this.state.page - 1 });
        this.updateNews();

    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            // this.setState({ loading: true })

            // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // let data = await fetch(url);
            // let parseData = await data.json();

            // this.setState({
            //     page: this.state.page + 1,
            //     articles: parseData.articles,
            //     loading: false,
            // })

            this.setState({ page: this.state.page + 1 });
            this.updateNews();

        }

    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        });


        console.log(`total result ${this.state.totalResults}`);
        console.log(`total article ${this.state.articles.length}`);

    };


    render() {
        return (


            //-----------------------------------------

            < >
                {/* 
                <h1 className="text-center my-3">Top News Today {this.state.articles.length}</h1>
                <h1 className="text-center my-3">Top News Today {this.state.articles.length}</h1> */}
                <h1 className="text-center my-3">Top News Today {this.state.articles.length}</h1>
                <h1 className="text-center my-3">Top News Today ({this.state.totalResults})</h1>


                {this.state.loading && <Spinner />}



                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">

                        <div className="row container_row">
                            {this.state.articles?.map((element, index) => {
                                const articleKey = `${element.url}-${index}`; // Unique key based on URL and index

                                return <div className='col-md-3' key={articleKey}>
                                    <NewsItem publishedAt={element.publishedAt} source={element.source.name ? element.source.name : ""} title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 40) : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} />
                                </div>
                            })}

                        </div>
                    </div>



                </InfiniteScroll>
            </>
            //----------------------------------- 1st code ---------------------------------------
            // <div className='container ' >

            //     <h1 className="text-center my-3">Top News Today</h1>
            //     {this.state.loading && <Spinner />}

            //     {!this.state.loading && <div className="row container_row">
            //         {this.state.articles?.map((element) => {
            //             return <div className='col-md-3' key={element.url}>
            //                 <NewsItem publishedAt={element.publishedAt} title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 40) : ""}
            //                     imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} />
            //             </div>
            //         })}

            //     </div>}

            //     <div className="container_button d-flex justify-content-between">
            //         {!this.state.loading && <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handlePreviousClick}>&larr; Previous</button>}
            //         {!this.state.loading && <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize))} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>}

            //     </div>



            // </div>
        )
    }
}
