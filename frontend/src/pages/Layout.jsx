import Header from "./Header";
import Sidebar from "./Siderbar";

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={`app-container ${isSidebarVisible ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <Sidebar isVisible={isSidebarVisible} />
                <Header onToggleSidebar={toggleSidebar} />
                <div className="pc-container">
                    <div className="pc-content">
                        {children}
                    </div>
                </div>
                {/* <Footer /> */}
        </div>
    );
};

export default Layout;
