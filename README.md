- Jest에서 `{filename}.test.js` 이거나 `/test 폴더`에 들어있으면 Jest가 알아서 테스트 케이스를 실행해준다.
- CRA를 이용해서 프로젝트를 생성하면 기본적으로 App.test.js가 생성되기 때문에 초기에 npm test 명령어로 테스트를 실행하면 App.test.js 파일의 테스트가 진행된다.

```javascript
// App.js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); // 테스트를 진행할 컴포넌트를 렌더링
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); // App.js에 learn react라는 텍스트가 있는지 확인
});
```

### `render(컴포넌트)` 함수

- JS DOM에 컴포넌트를 렌더링하는 함수
- 인자로 렌더링할 React 컴포넌트가 들어간다.
