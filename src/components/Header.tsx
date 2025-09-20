import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ArtisanHub</h1>
              <p className="text-xs text-amber-200">Traditional Arts & Crafts</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-amber-200 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-amber-200 transition-colors font-medium">
              Artworks
            </Link>
            <Link to="/create" className="text-white hover:text-amber-200 transition-colors font-medium">
              Create
            </Link>
            <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full transition-colors font-medium">
              Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;