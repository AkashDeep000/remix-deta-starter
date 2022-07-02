import {
  MdClose
} from "react-icons/md";

export default function Menu( {
  props
}) {
  const [menuOpen,
    setMenuOpen] = props;
  const menuClickHandler = () => {
    setMenuOpen(false)
  }
  return (
    <div className="grid grid-cols-[auto_1fr] fixed top-0 left-0 h-full w-full backdrop-blur-sm backdrop-brightness-75 z-50">
     <nav className="w-80 h-full bg-white">
     <div onClick={menuClickHandler} className="w-100">
      <MdClose className="float-right text-slate-500 p-2.5 w-14 h-14" />
    </div>
    </nav>
    <div onClick={menuClickHandler} className="h-[100%]">
    </div>
    </div>
  )
}