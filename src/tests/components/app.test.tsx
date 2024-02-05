import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'
import ReactDOM from 'react-dom'
import App from '../../components/App'

describe('The <Checkbox /> component', () => {
  it('Should render the label and checkbox the user will see', () => {
    const { getAllByTitle } = render(<App />)

    console.log(getAllByTitle)

  })
}


