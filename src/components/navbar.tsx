export default function NavBar() {
    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-lg font-bold">Clothing For You!</a>
            <ul className="flex space-x-4">
            <li><a href="/" className="text-white hover:text-gray-300">Discover</a></li>
            <li><a href="/products" className="text-white hover:text-gray-300">Categories</a></li>
            <li><a href="/adminPanel" className="text-white hover:text-gray-300">Admin Panel</a></li>
            </ul>
        </div>
        </nav>
    );
}