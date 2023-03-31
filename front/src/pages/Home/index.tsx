import React, { useState } from 'react';
import { nameState } from '../../store/name';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function Home(): React.ReactElement {
  const navigate = useNavigate();
  const [userName, setUserName] = useRecoilState(nameState);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (): void => {
    if (!inputValue) {
      alert('닉네임은 한글자 이상으로 설정해주세요.');
    } else {
      setUserName(inputValue);
      navigate('/chat');
    }
  };

  return (
    <div>
      <h2>사용자 이름을 입력해주세요.</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default Home;
