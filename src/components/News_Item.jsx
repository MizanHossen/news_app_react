import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, publishedAt, source } = props;
    // Convert the publishedAt time string to a JavaScript Date object
    const publishedDate = new Date(publishedAt);

    // Format the Date object into a readable format (e.g., "Month Day, Year")
    const formattedPublishedDate = publishedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='news_item_container my-3'>
            <div className="card" >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}

                >
                    <span className="badge rounded-pill bg-danger">{source}</span>

                </div>
                <img src={!imageUrl ? "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">Published on {formattedPublishedDate}</small></p>

                    <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary btn_button">Read more</a>
                </div>
            </div>
        </div >
    )

}

export default NewsItem
