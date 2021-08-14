import React, { useEffect, useState } from 'react'
import { ShowMoreArrow } from '../icons'
import Review from '../components/Review'
import '../styles/filterPanel.css'

const filters = [
    'Немного жмёт',
    "Без запаха",
    "Эргономичная рукоятка",
    "Эргономичная рукоятка",
    "Крассивые кроссовки",
    "Классный жилет"
]


let httpRequest = 'https://w-api2.aplaut.io/widgets/v2/render.json?authentication_token=56fa337b8ddf870c76021a5f&context=product&context_id=10350209&theme_id=default&widget_id=product-reviews&per_page=3&page=1'
let pageNumString, newPageNumString, newPageNum = 0


// Я полностью согласен, что вид моих запросов ужасен, однако я пытался вытащить этот промис в отдельную функцию, но у меня крашилось приложение
// К сожалению, я не успеваю сейчас довести это до ума

const ReviewsContainer = () => {

    const [dataLoadedState, setDataLoadedState] = useState(false)
    const [mainData, setMainData] = useState([])
    
    const [openedCollapse, setOpenedCollapse] = useState(false)
    const [sortValue, setSortValue] = useState('Сначала последние')

    const toggleOpenedCollapse = () => {
        if (openedCollapse) {
            setOpenedCollapse(false)
        } else {
            setOpenedCollapse(true)
        }
    }

    const toggleSort = async (string) => {
        setSortValue(string)
        setOpenedCollapse(false)
        let index_1 = httpRequest.indexOf('&')
        let index_2 = httpRequest.indexOf('context')
        let newFilterString = ''
        switch (string) {
            case 'Сначала последние': newFilterString = '&created_at:asc&'
            case 'По дате': newFilterString = '&published_at:desc&'
            case "По дате импорта": newFilterString = '&imported_at:asc&'
        }
        httpRequest = httpRequest.slice(0, index_1) + newFilterString + httpRequest.slice(index_2)

        await fetch(httpRequest)
        .then( async (response) => {
          if ( ! (response.status >= 400 && response.status < 600 )) {
            setDataLoadedState(true)
  
            const reader = response.body.getReader()
            let chunks = []
            let receivedLength = 0
  
            while (true) {
              const {done, value} = await reader.read()
              
              if (done) {
                break
              }
  
              chunks.push(value)
              receivedLength += value.length;
  
            }
  
            let chunksAll = new Uint8Array(receivedLength)
            let position = 0
            for(let chunk of chunks) {
              chunksAll.set(chunk, position)
              position += chunk.length
            }
  
            let result = new TextDecoder("utf-8").decode(chunksAll)
  
            let commits = JSON.parse(result).reviews
            
            setMainData(commits)
          } else {
            throw new Error("Bad response from server")
          }
        })
        .catch( err => {
          console.log(err)
        }) 
    }

    const loadMoreReviews = async () => {
        pageNumString = httpRequest.indexOf('&page=')
        newPageNumString = httpRequest.slice(pageNumString+6)
        newPageNum = parseInt(newPageNumString, 10) + 1
        httpRequest = httpRequest.substr(0, pageNumString+6) + newPageNum
        await fetch(httpRequest)
        .then( async (response) => {
          if ( ! (response.status >= 400 && response.status < 600 )) {
            setDataLoadedState(true)
  
            const reader = response.body.getReader()
            let chunks = []
            let receivedLength = 0
  
            while (true) {
              const {done, value} = await reader.read()
              
              if (done) {
                break
              }
  
              chunks.push(value)
              receivedLength += value.length;
  
            }
  
            let chunksAll = new Uint8Array(receivedLength)
            let position = 0
            for(let chunk of chunks) {
              chunksAll.set(chunk, position)
              position += chunk.length
            }
  
            let result = new TextDecoder("utf-8").decode(chunksAll)
  
            let commits = JSON.parse(result).reviews
            
            setMainData([...mainData, ...commits])
          } else {
            throw new Error("Bad response from server")
          }
        })
        .catch( err => {
          console.log(err)
        }) 
    }

    useEffect( async () => {
        await fetch(httpRequest)
        .then( async (response) => {
          if ( ! (response.status >= 400 && response.status < 600 )) {
            setDataLoadedState(true)
  
            const reader = response.body.getReader()
            let chunks = []
            let receivedLength = 0
  
            while (true) {
              const {done, value} = await reader.read()
              
              if (done) {
                break
              }
  
              chunks.push(value)
              receivedLength += value.length;
  
            }
  
            let chunksAll = new Uint8Array(receivedLength)
            let position = 0
            for(let chunk of chunks) {
              chunksAll.set(chunk, position)
              position += chunk.length
            }
  
            let result = new TextDecoder("utf-8").decode(chunksAll)
  
            let commits = JSON.parse(result).reviews
            
            setMainData(commits)
          } else {
            throw new Error("Bad response from server")
          }
        })
        .catch( err => {
          console.log(err)
        }) 
    }, [])

    return (
        <div>
                <div className='filter-panel-container'>
                    <div className='tabs-line'>
                        <span>Отзывы, в которых упоминается</span>
                        <div>
                            {
                                filters.map(elem => (
                                    <div className='tab'>
                                        {elem}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='additional-filters'>
                        <div className='collapse' onClick={ () => toggleOpenedCollapse()}>{sortValue} <ShowMoreArrow/></div>
                        
                        <div className={`collapse-tab ${ openedCollapse ? 'opened-collapse' : '' }`} >
                            <span 
                                onClick={ () => {
                                    toggleSort('Сначала последние')
                                }}
                            >
                                    Сначала последние
                            </span>
                            <span
                                onClick={ () => {
                                    toggleSort('По дате импорта')
                                }}                            
                            >
                                По дате импорта
                            </span>
                            <span
                                onClick={ () => {
                                    toggleSort('По дате')
                                }}                            
                            >
                                По дате 
                            </span>
                        </div>

                        <div className='radio-container'><input type='radio' />Только с фото</div>
                    </div>
                </div>


            {   
                (mainData.length != 0)
                ?
                <div>
                    {
                        mainData.map( (e, index) => (
                            <Review
                                data={e}
                            />
                        ))
                    }
                    <div className='load-more-panel' onClick={ () => loadMoreReviews()}>
                        Загрузить ещё
                    </div>
                </div>
                :
                <span>Отзывов пока нет</span>
            }
        </div>
    )
}

export default ReviewsContainer