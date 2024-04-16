import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import artworksService from '../services/artworks.services'
import { AuthContext } from '../context/auth.context'


function EditArtworkPage() {
    const {isLoggedIn, user} = useContext(AuthContext)
    const {id} = useParams()

    const [artwork, setArtwork] = useState(null)

    const [title,setTitle] = useState("")
    const [year, setYear] = useState(2024)
    const [city, setCity] = useState("")
    const [dimensions, setDimensions] = useState({})
    const [imagesUrl, setImagesUrl] = useState([])
    const [medium, setMedium] = useState("")
    const [genre, setGenre] = useState("")
    
    const media = ["Photography", "Painting", "Installation", "Drawing"];
    const genres = [
      "Surreal",
      "Dada",
      "Minimalism",
      "Digital Art",
      "Abstract",
      "Figurative",
      "Conceptual Art"
    ];

    useEffect(()=>{
        artworksService.getArtwork(id)
        .then((response)=>{
            const initialArtwork = response.data
            console.log(initialArtwork)
            setArtwork(initialArtwork)
            setTitle(initialArtwork.title)
            setYear(initialArtwork.year)
            setCity(initialArtwork.city)
            setDimensions(initialArtwork.dimensions)
            setImagesUrl(initialArtwork.images_url)
            setMedium(initialArtwork.medium)
            setGenre(initialArtwork.genre)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [id])

    function handleSubmit(e){
        e.preventDefault()

        const changedArtwork = {
            title:title,
            artist:artwork.artist,
            year:year,
            city:city,
            dimensions:dimensions,
            images_url:imagesUrl,
            medium:medium,
            genre:genre,
            borrowedBy:artwork.borrowedBy,
            returnDate: artwork.returnDate,
            isForSale:artwork.isForSale
        }

        artworksService.updateArtwork(id, changedArtwork)
        .then((response)=>{
            console.log("successfully changed an artwork")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div id="EditArtworkPage" className='page-wrapper'>
        <h1>Edit Artwork</h1>

        {isLoggedIn && artwork && (
            <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className='edit-artwork-details-wrapper'>
                <input value={title} type="text" onChange={(e)=>{setTitle(e.target.value)}} />
                <input value={year} type="number" onChange={(e)=>{setYear(e.target.value)}} />
                <select name="city" onChange={(e)=>{setCity(e.target.value)}}>
                    <option value="Leipzig">Leipzig</option>
                </select>
                <label name="dimensions">Dimensions

                </label>
                <label name="images">Images
                {imagesUrl.map((oneUrl)=>{
                    <input type="url" value={oneUrl} />
                })}

                </label>
                <select name="medium" onChange={(e)=>{setMedium(e.target.value)}}>
                {media.map((oneMedium)=>{
                    return (
                        <option key={oneMedium} value={oneMedium}>{oneMedium}</option>
                    )
                })}
                    
                </select>
                <select name="medium" onChange={(e)=>{setGenre(e.target.value)}}>
                {genres.map((oneMedium)=>{
                    return (
                        <option key={oneMedium} value={oneMedium}>{oneMedium}</option>
                    )
                })}
                    
                </select>

                <button type='submit'>Submit Changes</button>

                
            </div>

            </form>
        )}
    </div>
  )
}

export default EditArtworkPage