import { useQuery } from '@apollo/client';
import { getBooksQuery } from './queries';

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const { books } = data || {};

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        throw error;
    }

    return (
        <div className="">
            {loading ? <div>Loading...</div> : (
                <ul id="book-list" className="">
                    {books.map(({ _id, name }) => (
                        <li key={_id}>{name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookList;
