import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'tdesign-react';

function App() {

  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(true);
  };
  const onConfirm = (context) => {
    console.log('点击了确认按钮', context);
    setVisible(false);
  };
  const onCancel = (context) => {
    console.log('点击了取消按钮', context);
  };
  const onClickCloseBtn = (context) => {
    console.log('点击了关闭按钮', context);
  };
  const onKeydownEsc = (context) => {
    console.log('按下了ESC', context);
  };
  const onClickOverlay = (context) => {
    console.log('点击了蒙层', context);
  };
  const handleClose = (context) => {
    console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
    setVisible(false);
  };

  const [count, setCount] = useState(0);

  const navigate = useNavigate()

  const sendToParent = () => {
    window.parent.postMessage(JSON.stringify({ data: 'hello' }), 'http://localhost:5173/')
  }

  const sendBus = () => {
    console.log(window.$wujie?.bus);
    window.$wujie?.bus?.$emit('message', 'sub-react send')
  }

  const handleJump = (to) => {
    console.log(window.$wujie);
    if (window.$wujie?.props?.jump) {
      window.$wujie.props.jump(to)
    } else {
      navigate(to)
    }
  }

  const alertMsg = () => {
    alert('消息弹出')
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        {count}
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setCount(count + 1)}>count + 1</button>
        </div>
      </div>
      <div className="card">
        <button onClick={() => sendToParent()} style={{ marginRight: '20px' }}>
          postMessage通信
        </button>
        <button onClick={() => sendBus()} style={{ marginRight: '20px' }}>
          bus通信
        </button>
        <button onClick={() => handleJump('/second')}>
          Jump
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className='card'>
        <button onClick={alertMsg}>alert</button>
        <button style={{ marginLeft: '20px' }} onClick={handleClick}>打开弹窗</button>
        <button style={{ marginLeft: '20px' }} onClick={() => handleJump('/')}>跳转iframe</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Dialog
        header="Basic Modal"
        visible={visible}
        confirmOnEnter
        onClose={handleClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onEscKeydown={onKeydownEsc}
        onCloseBtnClick={onClickCloseBtn}
        onOverlayClick={onClickOverlay}
      >
        <p>This is a dialog</p>
      </Dialog>
    </>
  )
}

export default App
