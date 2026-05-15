import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, jest } from '@jest/globals'
import { Button } from '../../src/components/common/Button'

describe('Button', () => {
  it('renders label and handles click', () => {
    const onClick = jest.fn()

    render(
      <Button type="button" onClick={onClick}>
        Submit
      </Button>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
