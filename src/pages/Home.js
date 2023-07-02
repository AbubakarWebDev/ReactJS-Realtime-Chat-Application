import React from 'react';

import Header from '../components/Header';
import ChatContainer from '../components/ChatContainer';
import SearchUserSidebar from '../components/SearchUserSidebar';

function Home() {  
  return (
    <>
      <Header />

      <ChatContainer />

      <SearchUserSidebar />
    </>
  )
}

export default Home;