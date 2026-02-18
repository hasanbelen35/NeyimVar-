//BACK_LABEL: "Geri Dön",
// BACK_ICON: "←",
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 mb-6 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-all"
        >←
            <span className="text-xl transform group-hover:-translate-x-1 transition-transform">
                Geri Dön
            </span>

        </button>
    )
}

export default BackButton
