export const RedirectPath = () => {
  const role = localStorage.getItem("role");
    
    switch (role) {
        case "admin": return "/admin";
        case "developer": return "/developer";
        case "tester": return "/tester";
        case "designer": return "/designer";
        default: return "/dashboard";
    }
};