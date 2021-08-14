import React, { useEffect, useState } from 'react'

import ProductHeader from './components/ProductHeader'
import ProductGallery from './components/ProductGallery'
import ReviewsContainer from './containers/ReviewsContainer'

function App() {

  const [dataLoadedState, setDataLoadedState] = useState(false)
  const [mainData, setMainData] = useState(false)

  useEffect( async () => {
      await fetch('https://w-api2.aplaut.io/widgets/v2/render.json?authentication_token=56fa337b8ddf870c76021a5f&context=product&context_id=10350209&theme_id=default&widget_id=product-reviews')
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

          let commits = JSON.parse(result)
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
    <div className='container'>
      {
        dataLoadedState
        ?
        <div>
          <ProductHeader 
            rating={ !!mainData ? mainData.product.rating : ''}
            recommended={ !!mainData ? mainData.product.recommended : ''}
          />
            { !!mainData ?
            mainData.product.review_photos.map( (elem, index) => {
                <img src={elem.url_small} />
            })
            :
            false  
          }
          <ProductGallery 
            photos={ !!mainData ? mainData.product.review_photos : []}
          />
          <ReviewsContainer />
        </div>
        : 
        <div>упс</div>
      }
    </div>
  );
}

export default App;
