import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('counter starts at 0', () => {
  // App 컴포넌트를 렌더링
  render(<App />);

  // screen object를 이용해서 counter element에 접근
  const counterElement = screen.getByTestId('counter');

  // id가 counter인 엘리먼트의 텍스트가 0인지 테스트
  expect(counterElement).toHaveTextContent(0);
});

test('minus button has correct text', () => {
  render(<App />);

  const buttonElement = screen.getByTestId('minus-button');

  expect(buttonElement).toHaveTextContent('-');
});

test('plus button has correct text', () => {
  render(<App />);

  const buttonElement = screen.getByTestId('plus-button');

  expect(buttonElement).toHaveTextContent('+');
});

test('+ button is pressed, counter changes to 1', () => {
  render(<App />);

  const buttonElement = screen.getByTestId('plus-button');
  fireEvent.click(buttonElement);

  const counterElement = screen.getByTestId('counter');

  expect(counterElement).toHaveTextContent(1);
});

test('on/off button has blue color', () => {
  render(<App />);

  const buttonElement = screen.getByTestId('on-off-button');

  // 해당 스타일을 가지고 있는지 테스트
  expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' });
});

// on/off 버튼을 클릭했을 때 +, - 버튼의 disabled 상태 테스트
test('prevent -, + button from being pressed when the on/off button is clicked', () => {
  render(<App />);

  const onOffButtonElement = screen.getByTestId('on-off-button');
  fireEvent.click(onOffButtonElement);

  const plusButtonElement = screen.getByTestId('plus-button');

  // 버튼의 disabled 상태 체크
  expect(plusButtonElement).toBeDisabled();
});
