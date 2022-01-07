import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../Counter'
import "@testing-library/jest-dom/extend-expect";

test("header renders with correct text", () => {
  const { getByTestId } = render(<Counter />)
  const headerEl = getByTestId("header")

  expect(headerEl.textContent).toBe("My Counter")
})

test("counter initally start with text of 0", () => {
  const { getByTestId } = render(<Counter />)
  const counterEl = getByTestId("counter")

  expect(counterEl.textContent).toBe("0")
})

test("input contains inital value of 1", () => {
  const { getByTestId } = render(<Counter />)
  const inputEl = getByTestId("input")

  expect(inputEl.value).toBe("1")
})

test("add button renders with +", () => {
  const { getByTestId } = render(<Counter />)
  const addBtn = getByTestId("add-btn")

  expect(addBtn.textContent).toBe("+")
})

test("subtract button renders with -", () => {
  const { getByTestId } = render(<Counter />)
  const subtractBtn = getByTestId("subtract-btn")

  expect(subtractBtn.textContent).toBe("-")
})

test("change value of input works correctly", () => {
  const { getByTestId } = render(<Counter />)
  const inputEl = getByTestId("input")

  expect(inputEl.value).toBe("1")//이벤트 적용 전 

  fireEvent.change(inputEl, {
    target: {
      value: "5"
    }
  })

  expect(inputEl.value).toBe("5")//이벤트 적용 후 
})

test("click on plus btn adds 1 to counter", () => {
  const { getByTestId } = render(<Counter />)
  const addBtnEl = getByTestId("add-btn")
  const counterEl = getByTestId("counter")

  expect(counterEl.textContent).toBe("0")//이벤트 적용 전

  fireEvent.click(addBtnEl)

  expect(counterEl.textContent).toBe("1")//이벤트 적용 후
})

test("click on subtract btn subtracts 1 from counter", () => {
  const { getByTestId } = render(<Counter />)
  const subtractBtnEl = getByTestId("subtract-btn")
  const counterEl = getByTestId("counter")

  expect(counterEl.textContent).toBe("0")//이벤트 적용 전

  fireEvent.click(subtractBtnEl)

  expect(counterEl.textContent).toBe("-1")//이벤트 적용 후
})

test("changing input value then clicking on add btn works correctly", () => {
  const { getByTestId } = render(<Counter />)
  const addBtnEl = getByTestId("add-btn")
  const counterEl = getByTestId("counter")
  const inputEl = getByTestId("input")

  fireEvent.change(inputEl, {
    target: {
      value: "5"
    }
  })

  fireEvent.click(addBtnEl)

  expect(counterEl.textContent).toBe("5")//이벤트 적용 후
})

test("changing input value then clicking on subtractBtnEl btn works correctly", () => {
  const { getByTestId } = render(<Counter />)
  const subtractBtnEl = getByTestId("subtract-btn")
  const counterEl = getByTestId("counter")
  const inputEl = getByTestId("input")

  fireEvent.change(inputEl, {
    target: {
      value: "5"
    }
  })

  fireEvent.click(subtractBtnEl)

  expect(counterEl.textContent).toBe("-5")//이벤트 적용 후
})

test("adding and then subtracting leads to the correct counter number", () => {
  const { getByTestId } = render(<Counter />)
  const addBtnEl = getByTestId("add-btn")
  const subtractBtnEl = getByTestId("subtract-btn")
  const counterEl = getByTestId("counter")
  const inputEl = getByTestId("input")

  fireEvent.change(inputEl, {
    target: {
      value: "10"
    }
  })

  fireEvent.click(addBtnEl)
  fireEvent.click(addBtnEl)
  fireEvent.click(addBtnEl)
  fireEvent.click(addBtnEl)
  fireEvent.click(subtractBtnEl)
  fireEvent.click(subtractBtnEl)

  expect(counterEl.textContent).toBe("20")

  fireEvent.change(inputEl, {
    target: {
      value: "5"
    }
  })

  fireEvent.click(addBtnEl)
  fireEvent.click(subtractBtnEl)
  fireEvent.click(subtractBtnEl)

  expect(counterEl.textContent).toBe("15")
})