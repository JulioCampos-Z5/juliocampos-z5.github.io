interface SectionTitleProps {
    children: string;
    subtitle?: string;
}

export default function SectionTitle({ children, subtitle }: SectionTitleProps) {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-left text-gray-800 dark:text-gray-100">{children}</h2>
            <span className="block mt-2 h-1 w-16 rounded-full bg-linear-to-r from-blue-500 to-violet-500"></span>
            {subtitle && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
    );
}
