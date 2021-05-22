import {useQuery, useMutation} from "react-apollo";
import {gql} from "apollo-boost"
import {Listings as ListingsData} from "./__generated__/Listings"
import {DeleteHotel as DeleteHotel, DeleteHotelVariables} from "./__generated__/DeleteHotel"

const HOTELS = gql`
    query Listings {
        listings {
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            numOfBaths
            rating
        }
    }
`
// remember that passes a param by using mongoDb schema
const DELETE_HOTEL = gql`
    mutation DeleteHotel($id: ID!){
        deleteListing(id: $id){
            id
        }
    }
`

interface Props {
    title: string
}

export const Listings = ({title}: Props) => {

    const {data, refetch, loading, error} = useQuery<ListingsData>(HOTELS)
    const hotels = data ? data.listings : null;
    //const [hotels, setHotels] = useState<Listing[] | null>(null)
    // const fetchListing = async () =>{
    //     const {data} =  await server.fetch<ListingsData>({query: HOTELS})
    //     setHotels(data.listings)
        
    // }
    const [deleteHotel, {loading: deleteHotelLoading, error: deleteHotelError}] = useMutation<DeleteHotel, DeleteHotelVariables>(DELETE_HOTEL);
    
    const handleDeleteHotel = async (id: string) =>{
        await deleteHotel({variables: {id}})
        refetch();
    }
    const showHotels = hotels ? (<ul>{hotels.map(hotel=>{
        return <li key={hotel.id}>{hotel.title} <button onClick={() => handleDeleteHotel(hotel.id)}>Delete Hotels</button></li>
    })}</ul>) : null

    if(loading) {
        return <h2>Loading data...</h2>
    }

    if(error){
        return <h2>Uh oh! Something went wrong!</h2>
    }
    const deleteHotelWarning = deleteHotelError ? <h4>Uh oh! Something went wrong with deleting</h4> : null;
    const deleteHotelLoadingMessage = deleteHotelLoading? <h4>deleting...</h4> : null;
    return (
        <div>
            <h1>{title}</h1>
            {showHotels}
            {deleteHotelWarning}
            {deleteHotelLoadingMessage}
        </div>
    )
}



