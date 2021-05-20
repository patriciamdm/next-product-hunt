import styled from '@emotion/styled'

const Button = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid var(--gray4);
    border-radius: 5px;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`

export default Button