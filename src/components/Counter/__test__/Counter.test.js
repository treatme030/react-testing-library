import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../Counter'
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  //DOM 요소를 렌더링 대상으로 설정
  const component = render(<Counter />)
  getByTestId = component.getByTestId
})

test("header renders with correct text", () => {
  const headerEl = getByTestId("header")

  expect(headerEl.textContent).toBe("My Counter")
})

test("counter initally start with text of 0", () => {
  const counterEl = getByTestId("counter")

  expect(counterEl.textContent).toBe("0")
})

test("input contains inital value of 1", () => {
  const inputEl = getByTestId("input")

  expect(inputEl.value).toBe("1")
})

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn")

  expect(addBtn.textContent).toBe("+")
})

test("subtract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn")

  expect(subtractBtn.textContent).toBe("-")
})

test("change value of input works correctly", () => {
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
  const addBtnEl = getByTestId("add-btn")
  const counterEl = getByTestId("counter")

  expect(counterEl.textContent).toBe("0")//이벤트 적용 전

  fireEvent.click(addBtnEl)

  expect(counterEl.textContent).toBe("1")//이벤트 적용 후
})

test("click on subtract btn subtracts 1 from counter", () => {
  const subtractBtnEl = getByTestId("subtract-btn")
  const counterEl = getByTestId("counter")

  expect(counterEl.textContent).toBe("0")//이벤트 적용 전

  fireEvent.click(subtractBtnEl)

  expect(counterEl.textContent).toBe("-1")//이벤트 적용 후
})

test("changing input value then clicking on add btn works correctly", () => {
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

test("counter container correct className", () => {
  const counterEl = getByTestId("counter")
  const addBtnEl = getByTestId("add-btn")
  const subtractBtnEl = getByTestId("subtract-btn")
  const inputEl = getByTestId("input")

  expect(counterEl.className).toBe("")

  fireEvent.change(inputEl, {
    target: {
      value: "5"
    }
  })

  fireEvent.click(addBtnEl)

  expect(counterEl.className).toBe("plus-color")

  fireEvent.click(subtractBtnEl)

  expect(counterEl.className).toBe("")

  fireEvent.click(subtractBtnEl)
  fireEvent.click(subtractBtnEl)

  expect(counterEl.className).toBe("minus-color")

})