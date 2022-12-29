import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAutrhorsQuery, getBooksQuery, addBookMutation } from './queries';

function AddBook() {
    const [newBook, setNewBook] = useState({ name: '', genre: '', authorId: '' });
    const { name, genre } = newBook;

    const { loading, error, data } = useQuery(getAutrhorsQuery);
    const { authors } = data || {};
    const [addBook, { data: nbData, loading: nbLoading, error: nbError }] = useMutation(addBookMutation, { 
        refetchQueries: () => [{
        query: getBooksQuery,
      }]});

    const onChange = ({ target }) => {
        const { name, value } = target;
        setNewBook((prevValue) => ({ ...prevValue, [name]: value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('new book >> ', newBook)
        addBook({
            variables: newBook
        })
    };
    


    if (error || nbError) {
        throw error;
    }

    const displayAuthors = ({ authors, loading, nbLoading }) => {
        if(loading || nbLoading){
            return( <option disabled>Loading authors...</option> );
        } else {
            return authors.map(author => {
                return( <option key={author._id} value={author.id}>{author.name}</option> );
            });
        }
    }

    return(
        <form id="add-book" onSubmit={onSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} name="genre" onChange={onChange} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select name="authorId" onChange={onChange}>
                    <option>Select author</option>
                    { displayAuthors({ authors, loading, nbLoading }) }
                </select>
            </div>
            <button>Add book</button>
        </form>
    );
}

export default AddBook;
