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

### 📌 `render(컴포넌트)` 함수

- JS DOM에 컴포넌트를 렌더링하는 함수
- 인자로 렌더링할 React 컴포넌트가 들어간다.

### 📌 `Query` 함수

- 페이지에서 요소를 찾기 위해 테스트 라이브러리가 제공하는 방법
- 여러 유형의 쿼리(`'get'`, `'find'`, `'query'`)가 있다.
- 이들 간 차이점은 요소가 발견되지 않으면 쿼리에서 오류가 발생하는지 여부 또는 Promise를 반환하고 다시 시도하는지 여부이다.
- 선택하는 페이지 콘텐츠에 따라 적절한 쿼리가 다를 수 있다.
- `getBy...` - 쿼리에 대해 일치하는 노드를 반환하고, 일치하는 요소가 없거나 둘 이상의 일치가 발견되면 에러를 발생시킨다.(둘 이상의 요소가 예상되는 경우 `getAllBy` 사용)
- `queryBy...` - 쿼리에 대해 일치하는 노드를 반환하고, 일치하는 요소가 없으면 `null`을 반환한다.
- `findBy...(getBy + waitFor)` - 주어진 쿼리와 일치하는 요소가 발견되면 `Promise` 객체를 반환한다. 요소가 발견되지 않거나 기본 제한 시간인 1000ms 후에 둘 이상의 요소가 발견되면 에러가 발생한다. 둘 이상의 요소를 찾아야 할 때는 `findAllBy`를 사용해야한다.
- `waitFor` - 일정 기간 동안 기다려야 할 통과할 때까지 기다린다.

  <img alt="getBy, queryBy, findBy 비교" src="https://user-images.githubusercontent.com/89335307/206975978-70929b6b-c2bb-4cd3-8e96-d5cb595c3c95.png">
