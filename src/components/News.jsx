import React, { useEffect, useState } from 'react'
import NewsItem from './News_Item'
import Spinner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const NewsComponent = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        // props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News`;

        updateNews();
    }, [])


    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=72e7b1c6e3a247e1b95434d65c3f95af&page=${page + 1}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setPage(page + 1)


    };

    return (


        //-----------------------------------------

        < >



            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: "90px" }}>Top news - {capitalizeFirstLetter(props.category)} Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles.map((element) => {
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
        //         {!this.state.loading && <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResult / props.pageSize))} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>}

        //     </div>



        // </div>
    )

}

export default NewsComponent



NewsComponent.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

NewsComponent.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
