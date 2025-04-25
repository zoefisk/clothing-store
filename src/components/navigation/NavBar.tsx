import CategoriesMenu from './CategoriesMenu';
import NavButton from "@/components/navigation/NavButton";

export default function NavBar() {
    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-lg font-bold">Clothing For You!</a>
            <ul className="flex space-x-4">
                <li><a href="/public" className="text-white hover:text-gray-300">Discover</a></li>
                <CategoriesMenu/>
                {/*<li><a href="/adminPanel" className="text-white hover:text-gray-300">Admin Panel</a></li> TODO: this should only appear if the signed in user is an admin. */ }
                <NavButton>
                    Create an Account
                </NavButton>

            </ul>
        </div>
        </nav>
    );
}