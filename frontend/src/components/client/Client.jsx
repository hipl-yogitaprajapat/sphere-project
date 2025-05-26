import { useState } from "react";
import Header from "../../pages/Header"
import Sidebar from "../../pages/Siderbar"

const Client = () => {
        const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
    return (
        <>
            {/* <div>Client</div> */}
       <Sidebar isVisible={isSidebarVisible} />
<Header onToggleSidebar={toggleSidebar}/>
        </>
    )
}

export default Client