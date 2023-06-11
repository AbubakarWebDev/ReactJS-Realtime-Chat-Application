import React from 'react';

import Header from '../components/Header';
import ChatContainer from '../components/ChatContainer';
import SearchUserSidebar from '../components/SearchUserSidebar';
import LoginRegisterForm from '../components/LoginRegisterForm';

function Home() {
  const avatarUrl = "https://ui-avatars.com/api/?bold=true&size=40&background=random&name=M+A";

  return (
    <>
      <Header avatarUrl={avatarUrl} />

      <ChatContainer />

      <SearchUserSidebar />
    </>
  )
}

export default Home;