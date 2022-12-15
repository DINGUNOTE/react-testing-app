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

### 📌 ESLint Testing Plugins

- eslint에서 사용되는 테스팅용 플러그인
  ```bash
  npm i -D eslint-plugin-testing-library
  npm i -D eslint-plugin-jest-dom
  ```
  - `testing-library` - render로 DOM을 그리는 부분
  - `jest-dom` - expect-matcher로 테스트하는 부분
- 내부 설정

  ```json
  {
    // 플러그인 추가
    "plugins": ["testing-library", "jest-dom"], // 플러그인 이름의 es-lint를 제외하고 작성

    // 사용할 규칙 추가
    "extends": [
      "react-app",
      "react-app/jest",
      "plugin:testing-library/react",
      "plugin:jest-dom/recommended"
    ],

    // 규칙을 변경할 때
    "rule": []
  }
  ```

### 📌 FireEvent API

- 유저가 발생시키는 액션(이벤트)에 대한 테스트를 해야 할 때 사용한다.
- 그러나 대부분의 경우 user-event로 처리한다.

### 📌 TDD를 이용한 Counter App 만들기

```javascript
// Counter는 0부터 시작한다.

// App.js
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div data-testid="counter">{count}</div>
      <div>
        <button
          type="button"
          data-testid="minus-button"
          onClick={() => setCount((prev) => prev - 1)}
          disabled={disabled}
        >
          -
        </button>
        <button
          type="button"
          data-testid="plus-button"
          onClick={() => setCount((prev) => prev + 1)}
          disabled={disabled}
        >
          +
        </button>
      </div>
      <div>
        <button
          style={{ backgroundColor: 'blue', color: '#fff' }}
          type="button"
          data-testid="on-off-button"
          onClick={() => setDisabled(true)}
        >
          on/off
        </button>
      </div>
    </>
  );
};

export default App;

// App.test.js
import { render, screen } from '@testing-library/react';
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
```

### 📌 GitHub Action을 이용해서 AWS S3로 자동 배포 설정 해보기

1. AWS 버킷 생성
2. 해당 버킷의 속성 탭 -> 설정 -> 정적 웹 사이트 호스팅 편집 -> 정적 웹 사이트 호스팅 활성화 인덱스 문서(기본 페이지 html) 작성 후 저장
3. 권한을 설정해주기 위해서 버킷의 권한 탭 -> 퍼블릭 액세스 차단(버킷 설정) -> 모든 퍼블릭 액세스 차단 해제 후 저장
4. 버킷 정책 편집 -> 정책 작성([버킷 정책 예제](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/example-bucket-policies.html)) 후 저장
5. 해당 GitHub Repository의 Actions 탭에서 Node.js의 configure 선택
6. node.js.yml 파일에 브랜치와 Node.js 버전 등을 확인 후 규칙 작성(`참고` : [awact/s3-action](https://github.com/awact/s3-action))
7. GitHub Repository Setting 탭 -> Secret -> Actions -> New Repository Secret -> New Secret에서 AWS ACCESS KEY, SECRET ACCESS KEY 등을 환경 변수로 사용하기 위해 저장한다.
