import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";

interface Props {
    onHideNav?: Function,
    onShowNav?: Function,
    showNav?: boolean,
    siteTitle?: string
}
export default function NavBar(props: Props) {

    const sections =['blog', 'photos', 'tutorials', 'fitness', 'about', 'now']
    const [showMobileNav, setShowMobileNav] = useState(props.showNav || false)
    const location = useLocation()

    return (
        <nav className="bg-black">
          <div className="max-w-6xl mx-auto px-2">
            <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
                <h1 className="text-base tracking-tight nav-link-font font-extrabold text-white sm:text-xl my-auto md:ml-0 ">
                    <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}> jayson j. phillips</Link>
                </h1>
            </div>
            
            <div className="hidden lg:block lg:ml-6">
                <div className="flex space-x-4 text-white justify-end">
                    {sections.map( (navItem, idx) => {
                      let to = `/${navItem}`;
                      const isActive = to === location.pathname || location.pathname.startsWith(`${to}/`);
                      return (
                        <Link key={idx} to={to} className={`nav-link nav-link-font text-white ${isActive ? 'active' : ''}`}>{navItem}</Link>
                      )}
                    )}
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                </div>
            </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <button onClick={() => setShowMobileNav(!showMobileNav)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  {/* Icon when menu is closed. */}
                  {/*
              Heroicon name: menu
  
              Menu open: "hidden", Menu closed: "block"
            */}
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {/* Icon when menu is open. */}
                  {/*
              Heroicon name: x
  
              Menu open: "block", Menu closed: "hidden"
            */}
                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/*
      Mobile menu, toggle classes based on menu state.
  
      Menu open: "block", Menu closed: "hidden"
    */}
          <div className={`nav-mobile ${showMobileNav ? 'show' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {sections.map( (navItem, idx) => (
                        <Link key={idx} to={`/${navItem.includes('projects') ? 'tutorials' : navItem}`} className="nav-link text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{navItem}</Link>
                    ))}
            
            </div>
          </div>
        </nav>
      );
}