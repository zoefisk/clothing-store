export default function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-bold text-gray-900 dark:text-white">
            {children}
        </p>
    );
}