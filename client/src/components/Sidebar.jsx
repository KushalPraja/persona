// src/components/Sidebar.jsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { useUserContext } from '@/context/useUserContext';
import { LogOut } from 'lucide-react';

export default function Sidebar() {
    const { user, logout } = useUserContext();
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', path: '/client/dashboard' },
        { name: 'Profile', path: '/client/profile' },
        { name: 'Settings', path: '/client/settings' },
    ];

    return (
        <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border shadow-sm flex flex-col justify-between">
            <div className="p-6">
                <h1 className="text-2xl p-6 text-center comfortaa text-sidebar-foreground mb-8 ">
                    <Link href="/">Persona</Link>
                </h1>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === item.path
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>


            </div>

            <div className="p-6">
                <div className="bg-sidebar-accent p-4 rounded-lg">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">User</h2>
                    {user ? (
                        <div className="mt-2 text-sm text-sidebar-foreground">
                            <p>{user.username}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground mt-2">No user logged in</p>
                    )}
                    {/* User Profile Picture */}

                    <div className="mt-2">
                        <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full" />
                        {console.log(user.avatar)}
                    </div>

                </div>

                <Button
                    variant="destructive"
                    className="w-full flex items-center justify-center gap-2 bg-blue-500"
                    onClick={logout}
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
