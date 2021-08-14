import { element } from 'prop-types'
import React from 'react'
import { RateStar, ThumbDown, ThumbUp, Dots, Pencil, PhotoCamera } from '../icons'
import '../styles/review.css' 
import dateParseFunc from '../dateParseFunc'
import getRandomColor from '../getRandomColor'

const Review = (props) => {

    const data = props.data
    const color = getRandomColor()

    return (
        <div className='review-container'>

            <div className='review-header'>
                <div className='header-photo' style={{background: color + ', 0.2)' }}>
                    {
                        data.author.avatar_url
                        ?
                        <img src={data.author.avatar_url} />
                        :
                        <span style={{color: color+')'}}>{data.author.initials}</span>
                    }
                </div>

                <div className='header-info'>
                    <span className='name'>{data.author.name}</span>
                    <div className='review-header-rating'>
                        <span className='review-rate-star-row'>
                            <RateStar/>
                            <RateStar/>
                            <RateStar/>
                            <RateStar/>
                            <RateStar/>
                        </span>
                        <span>
                            Опыт использования 
                            <span> </span>
                            {
                                !!data.author.details
                                &&
                                data.author.details[1].value.toLowerCase()
                            }
                        </span>
                    </div>
                    <span className='published-date'>{dateParseFunc(data.published_at)}</span>
                </div>
            </div>

            <div className='review-body'>
                {
                    data.body
                }
                {
                    data.photos.map( elem => (
                        <img src={elem.url} alt='photo'/>
                    ))
                }
            </div>

            <div className='review-interaction'>
                <div className='interaction-panel'>
                    <div >
                        <span><ThumbUp /></span>
                        <span>{data.likes} Полезный отзыв</span>
                        <span><ThumbDown /></span>
                        <div></div>
                        <span>{data.dislikes}</span>
                        <span>Ответить</span>
                        <span><Dots/></span>
                    </div>
                    <span className='source'>Источник: {data.store.site_host}</span>
                </div>  
            </div>

            {
                data.comments.length !== 0
                ?
                <div className='reviews-comments-container'>

                    <div className='your-comment-input-container'>
                        <div> 
                            <div className='comment-input-photo'> 
                                <PhotoCamera/>
                            </div>

                            <span>Аноним</span>

                            <span><Pencil/></span>
                        </div>

                        <input placeholder='Комментировать отзыв...' />
                    </div>

                    <div className='your-comment-panel'>
                        <div>
                            <div className='rules'>Правила сообщества</div>
                        </div>
                        <div>
                            <div className='cancel'>Отмена</div>
                            <div className='send'>Отправить</div>
                        </div>
                    </div>

                    {
                        data.comments.map( elem => (
                            <div className='comment'>
                                <div className='comment-photo'>
                                    {
                                        elem.author.avatar_url
                                        ?
                                        <img src={data.author.avatar_url} />
                                        :
                                        <span>{elem.author.initials}</span>
                                    }
                                </div>
                                <div className='comment-body'>
                                    <div className='comment-header'>
                                        <span className='name'>{elem.author.name}</span>
                                        <span>&#183;</span>
                                        <span>{dateParseFunc(elem.created_at)}</span>
                                    </div>

                                    <div className='comment-text'>
                                        {elem.body}
                                    </div>

                                    <div className='comment-panel'>
                                        <div>
                                            <span>Ответить</span>
                                            <span>&#183;&#183;&#183;</span>
                                        </div>

                                        <div>
                                            <span><ThumbUp/></span>
                                            <span>{elem.likes}</span>
                                            <span><ThumbDown/></span>
                                            <span>{elem.dislikes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                false
            }
        </div>
    )
}

export default Review

