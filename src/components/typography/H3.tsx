export default function H3({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-m font-bold text-gray-900 dark:text-white">
            {children}
        </h3>
    );
}