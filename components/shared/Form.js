import styled from '@emotion/styled'

export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
`;

export const Field = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input {
        flex: 1;
        paddin: 1rem;
    }
`;

export const InputSubmit = styled.input`
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.8rem;
    font-weight: 700;
    font-family: 'PT Sans', sans-serif;
    color: white;
    background-color: var(--orange);
    border: none;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
    }
`;