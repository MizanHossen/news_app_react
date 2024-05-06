import React, { Component } from 'react'
import NewsItem from './News_Item'
import Spinner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsComponent extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (


            //-----------------------------------------

            < >



                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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
