export default function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-s text-gray-900 dark:text-white">
            {children}
        </p>
    );
}