interface ButtonProps {
  name: string
  className?: string
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({name, onClick, className}) => {
  return (
    <div className={`flex items-center justify-center border-[3px] border-solid border-[#000807] rounded-full px-10 py-2 ${className} bg-[#EFD0CA] w-60`}>
      <button type="button" onClick={onClick} className="text-sm font-bold">
        {name}
      </button>
    </div>
  )
}

export default Button