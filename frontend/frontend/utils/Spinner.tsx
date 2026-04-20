
interface SpinnerProps {
  color?: string; 
}
// spinner 
export default function Spinner({ color = "text-blue-600" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          w-12 h-12 
          border-[3px] 
          ${color} 
          animate-spin 
          rounded-full 
          border-solid 
          border-current 
          border-t-transparent
        `}
        role="status"
      >
        <span className="sr-only">Yükleniyor...</span>
      </div>
    </div>
  );
}