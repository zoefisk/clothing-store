export default function H1({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {children}
        </h3>
    );
}