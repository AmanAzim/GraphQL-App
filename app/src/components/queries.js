import { gql } from '@apollo/client';

export const getBooksQuery = gql`{
    books {
        _id
        id
        name
    }
}`;

export const getAutrhorsQuery = gql`{
    authors {
        _id
        id
        name
    }
}`;

export const addBookMutation = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
        }
    }
`;
